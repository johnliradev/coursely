import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CategoriesProvider } from "@/contexts/categories-context";
import { SearchProvider } from "@/contexts/search-context";
import { UserProvider } from "@/contexts/user-context";
import { ProductsProvider } from "@/contexts/products-context";
import { Footer } from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Coursely",
  description: "Coursely is a platform for learning online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <CategoriesProvider>
              <SearchProvider>
                <ProductsProvider>
                  <div className="flex flex-col min-h-screen">
                    <main className="flex-1">{children}</main>
                    <Footer />
                  </div>
                </ProductsProvider>
              </SearchProvider>
            </CategoriesProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
