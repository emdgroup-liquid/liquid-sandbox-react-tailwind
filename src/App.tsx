import { ThemeName } from "@emdgroup-liquid/liquid/dist/types/components/ld-theme/ld-theme";
import * as React from "react";
import Form from "./components/Form/Form";

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

function App() {
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
    <ld-theme name={currentTheme} class="flex flex-col min-h-screen">
      <ld-notification placement="bottom"></ld-notification>
      <main
        className="relative flex items-center"
        style={{ minHeight: "80vh" }}
      >
        <ld-bg-cells class="block absolute inset-0"></ld-bg-cells>
        <div className="container mx-auto px-ld-24 pt-ld-40 pb-24 relative max-w-2xl">
          <ld-heading level="1" visual-level="b1" class="text-vy mb-ld-40">
            Liquid Sandbox App
          </ld-heading>
          <Form onChangeTheme={handleChangeTheme} />
        </div>
      </main>
      {/* <Footer /> */}
    </ld-theme>
  );
}

export default App;
