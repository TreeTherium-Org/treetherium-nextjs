import Section from '/src/app/component/layouts/Section.js';
import "./globals.css";


export const metadata = {
  title: "Landing Page",
  description: "Welcome to Treetherium",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <Section allNotification={false} searchPopup={true} title={'Welcome'}>
            {children}
          </Section>
        </body>
    </html>
  );
}
