"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import { 
  useGetAllQuizzesQuery, 
  useCreateQuizMutation, 
  useUpdateQuizMutation, 
  useDeleteQuizMutation,
  useGetAllModulesQuery
} from "@/redux/features/module/courseModuleApi";
import { Loader2, Plus, Edit, Trash2, X, Edit2, HelpCircle } from "lucide-react";

export default function QuizzesPage() {
  const { data: quizzesData, isLoading: queriesLoading } = useGetAllQuizzesQuery();
  const { data: modulesData } = useGetAllModulesQuery();
  const quizzes = quizzesData?.data || [];
  const modules = modulesData?.data || [];

  const [createQuiz] = useCreateQuizMutation();
  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  
  // To keep it clean, we handle 1 question dynamically for demo. In production, this can be an array of questions.
  const [formData, setFormData] = useState({ 
    moduleId: "", 
    questionTitle: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "0" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (quiz?: any) => {
    if (quiz) {
      setEditingQuiz(quiz);
      // Populate first question if exists
      const firstQ = quiz.questions && quiz.questions.length > 0 ? quiz.questions[0] : null;
      setFormData({
        moduleId: quiz.moduleId,
        questionTitle: firstQ?.question || "",
        option1: firstQ?.options?.[0] || "",
        option2: firstQ?.options?.[1] || "",
        option3: firstQ?.options?.[2] || "",
        option4: firstQ?.options?.[3] || "",
        correctOption: firstQ?.correctAnswer?.toString() || "0"
      });
    } else {
      setEditingQuiz(null);
      setFormData({ moduleId: "", questionTitle: "", option1: "", option2: "", option3: "", option4: "", correctOption: "0" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuiz(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct the payload structure backend expects
    const payload = {
        moduleId: formData.moduleId,
        quiz: {
            questions: [
                {
                    question: formData.questionTitle,
                    options: [formData.option1, formData.option2, formData.option3, formData.option4].filter(Boolean),
                    correctAnswer: Number(formData.correctOption)
                }
            ]
        }
    };

    try {
      if (editingQuiz) {
        await updateQuiz({ id: editingQuiz.id, data: payload }).unwrap();
        toast.success("Quiz updated successfully!");
      } else {
        await createQuiz(payload).unwrap();
        toast.success("Quiz created successfully!");
      }
      closeModal();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to save quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quiz? All associated questions will be removed.")) {
      try {
        await deleteQuiz(id).unwrap();
        toast.success("Quiz deleted successfully!");
      } catch (err: any) {
        toast.error(err.data?.message || "Failed to delete quiz");
      }
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              <HelpCircle className="w-3.5 h-3.5" /> Interactive Testing
           </div>
           <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-tight italic">
              Manage Quizzes.
           </h1>
           <p className="text-muted-foreground font-medium max-w-xl">
              Create multiple-choice quizzes to assess your students' retention and reinforce core concepts.
           </p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="h-14 px-8 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Quiz
        </button>
      </div>

      {queriesLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
            <p className="text-sm font-black uppercase tracking-widest text-muted-foreground animate-pulse">Loading Quizzes...</p>
        </div>
      ) : (
        <div className="bg-card border border-border/60 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/5">
          {quizzes.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-40 text-center space-y-6">
                <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center text-muted-foreground/20">
                    <HelpCircle className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                    <h4 className="text-xl font-black italic">No Quizzes Found.</h4>
                    <p className="text-sm font-medium text-muted-foreground">Start building assessments for your modules.</p>
                </div>
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/30">
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Questions (Count)</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Module</th>
                    <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Course</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/50">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {quizzes.map((quiz: any) => (
                    <tr key={quiz.id} className="group hover:bg-muted/20 transition-colors">
                      <td className="px-8 py-6">
                         <div className="inline-flex items-center justify-center px-3 py-1 bg-secondary rounded-full text-xs font-bold text-muted-foreground">
                            {quiz.questions?.length || 0} Questions
                         </div>
                      </td>
                      <td className="px-8 py-6">
                          <p className="font-bold text-foreground text-sm">{quiz.module?.title || "N/A"}</p>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-xs font-bold text-muted-foreground">{quiz.module?.course?.title || "N/A"}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => openModal(quiz)}
                                className="h-9 px-4 bg-background border border-border/50 rounded-xl text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 shadow-sm"
                            >
                                <Edit2 className="w-3.5 h-3.5" /> Edit
                            </button>
                            <button
                                onClick={() => handleDelete(quiz.id)}
                                className="h-9 w-9 bg-background border border-border/50 rounded-xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modern Dialog Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="bg-card border border-border/60 w-full max-w-xl p-8 rounded-[2.5rem] shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <button onClick={closeModal} className="absolute right-8 top-8 text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
            </button>
            <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight italic">{editingQuiz ? "Edit Quiz." : "New Quiz."}</h2>
                <p className="text-sm text-muted-foreground font-medium">Configure the quiz questions and answers.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Target Module</label>
                <select 
                  required
                  disabled={!!editingQuiz}
                  value={formData.moduleId} 
                  onChange={e => setFormData({...formData, moduleId: e.target.value})}
                  className="w-full h-14 px-6 bg-secondary/30 border border-transparent rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm cursor-pointer disabled:opacity-50"
                >
                  <option value="" disabled>Select a module...</option>
                  {modules.map((mod: any) => (
                    <option key={mod.id} value={mod.id}>{mod.title} ({mod.course?.title || "N/A"})</option>
                  ))}
                </select>
                {!editingQuiz && <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mt-2 px-2">A module can explicitly host one Quiz.</p>}
              </div>

              <div className="p-6 bg-secondary/20 rounded-[2rem] border border-border/40 space-y-6">
                 <h3 className="font-black italic text-lg text-foreground">Question Configuration</h3>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Question Title</label>
                    <input required type="text" placeholder="e.g. What is React?" value={formData.questionTitle} onChange={e => setFormData({...formData, questionTitle: e.target.value})} className="w-full h-12 px-5 bg-background border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm" />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Option 1</label>
                        <input required type="text" value={formData.option1} onChange={e => setFormData({...formData, option1: e.target.value})} className="w-full h-12 px-5 bg-background border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-xs" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Option 2</label>
                        <input required type="text" value={formData.option2} onChange={e => setFormData({...formData, option2: e.target.value})} className="w-full h-12 px-5 bg-background border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-xs" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Option 3</label>
                        <input required type="text" value={formData.option3} onChange={e => setFormData({...formData, option3: e.target.value})} className="w-full h-12 px-5 bg-background border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-xs" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Option 4</label>
                        <input required type="text" value={formData.option4} onChange={e => setFormData({...formData, option4: e.target.value})} className="w-full h-12 px-5 bg-background border border-transparent rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-xs" />
                    </div>
                 </div>

                 <div className="space-y-2 pt-2 border-t border-border/50">
                    <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Correct Option</label>
                    <select required value={formData.correctOption} onChange={e => setFormData({...formData, correctOption: e.target.value})} className="w-full h-12 px-5 bg-background border border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm text-primary cursor-pointer">
                        <option value="0">Option 1 is correct</option>
                        <option value="1">Option 2 is correct</option>
                        <option value="2">Option 3 is correct</option>
                        <option value="3">Option 4 is correct</option>
                    </select>
                 </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 flex-col sm:flex-row">
                <button type="button" onClick={closeModal} className="h-14 px-8 bg-secondary/50 hover:bg-secondary rounded-2xl text-xs font-black uppercase tracking-widest text-foreground transition-all">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="h-14 px-8 bg-primary rounded-2xl text-xs font-black uppercase tracking-widest text-white flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition-all shadow-xl shadow-primary/20">
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editingQuiz ? "Save Changes" : "Create Quiz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
