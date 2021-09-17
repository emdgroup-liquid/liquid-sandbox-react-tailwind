import * as React from "react";
import { ThemeName } from "@emdgroup-liquid/liquid/dist/types/components/ld-theme/ld-theme";
import Footer from "./components/Footer/Footer";
import Form from "./components/Form/Form";
import {
  LdBgCells,
  LdHeading,
  LdNotification,
  LdTheme,
} from "@emdgroup-liquid/liquid/dist/react";

const successMessages = [
  "Nice! 👍",
  "Aaaweeesome! 🙌",
  "Rock on! 🤘",
  "How cool is that?! 😎",
  "Rad! 🤓",
  "Supersonic! ⚡️",
  "Magic! ✨",
  "Groovy baby! 🕺",
  "Lovely! 🥰",
  "Smooth! 💆‍♀️",
  "Mind-blowing! 🤯️",
  "Excellent! 👌️",
  "Delicious! 🤤️",
  "Outa space! 👽",
];

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeName>("ocean");
  const handleChangeTheme = React.useCallback((theme: ThemeName) => {
    setCurrentTheme(theme);
    setTimeout(() => {
      const content = successMessages.shift();
      dispatchEvent(new CustomEvent("ldNotificationClear"));
      dispatchEvent(
        new CustomEvent("ldNotificationAdd", {
          detail: {
            content: content,
            type: "info",
            timeout: 2000,
          },
        })
      );
      successMessages.push(content!);
    }, 500);
  }, []);

  return (
    <LdTheme name={currentTheme} class="flex flex-col min-h-screen">
      <LdNotification placement="bottom" />
      <main
        className="relative flex items-center"
        style={{ minHeight: "80vh" }}
      >
        <LdBgCells class="block absolute inset-0" />
        <div className="container mx-auto px-ld-24 pt-ld-40 pb-24 relative max-w-2xl">
          <LdHeading level="1" visual-level="b1" class="text-vy mb-ld-40">
            Liquid Sandbox App
          </LdHeading>
          <Form onChangeTheme={handleChangeTheme} />
        </div>
      </main>
      <Footer />
    </LdTheme>
  );
};

export default App;
