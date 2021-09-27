import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { ThemeName } from "@emdgroup-liquid/liquid/dist/types/components/ld-theme/ld-theme";
import { useForm } from "react-hook-form";
import { titles } from "./titles";
import {
  LdButton,
  LdCheckbox,
  LdHeading,
  LdInput,
  LdInputMessage,
  LdLabel,
  LdOption,
  LdParagraph,
  LdSelect,
  LdTooltip,
} from "@emdgroup-liquid/liquid/dist/react";

type FormProps = {
  onChangeTheme: (theme: ThemeName) => void;
};

const themeOptions: { label: string; value: ThemeName }[] = [
  { value: "ocean", label: "Ocean" },
  { value: "bubblegum", label: "Bubblegum" },
  { value: "shake", label: "Shake" },
  { value: "solvent", label: "Solvent" },
  { value: "tea", label: "Tea" },
];

const Form: React.FC<FormProps> = ({ onChangeTheme }) => {
  const [theme, setTheme] = React.useState<ThemeName>("ocean");
  const [title, setTitle] = React.useState<string>();
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = useForm({ mode: "onBlur" });
  const handleCancel = React.useCallback(() => {
    dispatchEvent(new CustomEvent("ldNotificationClear"));
    dispatchEvent(
      new CustomEvent("ldNotificationAdd", {
        detail: {
          content: "This button doesn't really do anything. 👻",
          type: "warn",
        },
      })
    );
  }, []);
  const handleFormSubmit = React.useCallback(() => {
    dispatchEvent(new CustomEvent("ldNotificationClear"));
    dispatchEvent(
      new CustomEvent("ldNotificationAdd", {
        detail: {
          content: ReactDOMServer.renderToStaticMarkup(
            <>
              <span className="block">
                Thanks! We hope you like this sandbox. 🤗
              </span>
              <span className="block">
                <a
                  className="font-bold hover:underline"
                  href="https://github.com/emdgroup-liquid/liquid/discussions"
                  rel="noreferrer"
                  target="_blank"
                >
                  Reach out
                </a>{" "}
                if you have any questions!
              </span>
            </>
          ),
          type: "info",
          timeout: 0,
        },
      })
    );
  }, []);
  const handleFormInvalid = React.useCallback(() => {
    dispatchEvent(new CustomEvent("ldNotificationClear"));
    dispatchEvent(
      new CustomEvent("ldNotificationAdd", {
        detail: {
          content: "The form is invalid! 😱",
          type: "alert",
        },
      })
    );
  }, []);

  return (
    <form
      className="bg-wht rounded-l shadow-hover p-ld-32"
      onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
    >
      <LdHeading className="mb-ld-32" level="2">
        Hi there 👋
      </LdHeading>

      <LdParagraph className="mb-ld-16">
        This small sandbox app demonstrates{" "}
        <a
          className="font-bold hover:underline"
          href="https://emdgroup-liquid.github.io/liquid/"
          rel="noreferrer"
          target="_blank"
        >
          Liquid Oxygen
        </a>{" "}
        used in combination with React, Typescript and Tailwind CSS.
      </LdParagraph>
      <LdParagraph className="mb-ld-24">
        Let's change the theme of the app first:
      </LdParagraph>

      <LdLabel className="mb-ld-32 w-full">
        App Theme
        <LdSelect
          onInput={
            ((
              event: React.SyntheticEvent<
                HTMLInputElement,
                CustomEvent<ThemeName[]>
              >
            ) => {
              setTheme(event.nativeEvent.detail[0]);
              onChangeTheme(event.nativeEvent.detail[0]);
            }) as unknown as any
          }
          placeholder="Pick a theme"
          prevent-deselection
        >
          {themeOptions.map(({ label, value }) => (
            <LdOption selected={theme === value} value={value} key={value}>
              {label}
            </LdOption>
          ))}
        </LdSelect>
      </LdLabel>

      <LdParagraph className="mb-ld-24">
        Next we have set up some form validation:
      </LdParagraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-ld-32">
        <LdLabel>
          <span className="flex justify-between">
            Your title (optional)
            <LdTooltip arrow position="top right" className="h-1">
              <LdParagraph>
                We are asking because we'd like to address you correctly.
              </LdParagraph>
            </LdTooltip>
          </span>
          <LdSelect
            onInput={
              ((
                event: React.SyntheticEvent<
                  HTMLInputElement,
                  CustomEvent<string[]>
                >
              ) => {
                setTitle(event.nativeEvent.detail[0]);
              }) as unknown as any
            }
            placeholder="No title"
          >
            {titles.map((titleOption) => (
              <LdOption
                key={titleOption}
                value={titleOption}
                selected={title === titleOption}
              >
                {titleOption}
              </LdOption>
            ))}
          </LdSelect>
          <LdInputMessage
            className={title ? "visible" : "invisible"}
            mode="valid"
          >
            Good pick.
          </LdInputMessage>
        </LdLabel>

        <LdLabel>
          Your full name
          <LdInput
            placeholder="e.g. Jason Parse"
            tone="dark"
            {...register("fullName", {
              required: true,
            })}
          />
          <LdInputMessage
            className={
              errors.fullName || getValues("fullName") ? "visible" : "invisible"
            }
            mode={errors.fullName ? "error" : "valid"}
          >
            {errors.fullName && "Your full name is required."}
            {getValues("fullName") && "Lovely name."}
          </LdInputMessage>
        </LdLabel>

        <LdLabel>
          Your email address
          <LdInput
            type="email"
            placeholder="e.g. jason.parse@example.com"
            tone="dark"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          <LdInputMessage
            className={
              errors.email || getValues("email") ? "visible" : "invisible"
            }
            mode={errors.email ? "error" : "valid"}
          >
            {errors.email?.type === "required" &&
              "Your email address is required."}
            {errors.email?.type === "pattern" &&
              "This email address is invalid."}
            {!errors.email && getValues("email") && "Lovely email address."}
          </LdInputMessage>
        </LdLabel>

        <LdLabel>
          Your website (optional)
          <LdInput
            type="url"
            placeholder="e.g. https://example.com"
            tone="dark"
            {...register("website", {
              pattern: /^(https?:\/\/.*)?$/,
            })}
          />
          <LdInputMessage
            className={
              errors.website || getValues("website") ? "visible" : "invisible"
            }
            mode={errors.website ? "error" : "valid"}
          >
            {errors.website && "This URL is invalid."}
            {!errors.website &&
              getValues("website") &&
              "You even have a website! 👍"}
          </LdInputMessage>
        </LdLabel>
      </div>

      <LdLabel className="w-full mb-ld-32">
        Comment (optional)
        <LdInput
          multiline
          placeholder="Be creative!"
          value=""
          tone="dark"
          style={{ minHeight: "7rem" }}
        />
      </LdLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-ld-24 items-center">
        <LdLabel position="right" size="m">
          <span className={errors.termsAccepted ? "text-rr" : undefined}>
            I accept the terms (none).
          </span>
          <LdCheckbox
            tone="dark"
            {...register("termsAccepted", {
              required: true,
            })}
          />
        </LdLabel>

        <div className="grid grid-cols-2 gap-ld-16">
          <LdButton onClick={handleCancel} mode="secondary">
            Cancel
          </LdButton>
          <LdButton onClick={handleSubmit as any}>Submit</LdButton>
        </div>
      </div>
    </form>
  );
};

export default Form;
