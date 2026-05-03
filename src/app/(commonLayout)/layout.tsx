import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/Header";
import { PageBreadcrumb } from "@/components/shared/PageBreadcrumb";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <PageBreadcrumb />
      <main>{children}</main>
      <Footer/>
    </div>
  );
};

export default layout;

