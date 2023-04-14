import "./globals.css";
import Header from "@/component/Header";
import { Outfit } from "next/font/google";
import Providers from "../component/ReduxWrapper";
import Footer from "@/component/Footer";

const whole = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});
export const metadata = {
  title: "Book Store",
  description: "A Book store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${whole.className}  bg-[#1E293B]`}>
        <Providers>
          <Header />
          <div className="mt-14 mb-24 ">{children}</div>
          {/* <div className="relative  z-40 w-full">
            <Footer />
          </div> */}
        </Providers>
      </body>
    </html>
  );
}
