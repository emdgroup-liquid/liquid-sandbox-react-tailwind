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

const Form: React.FC<FormProps> = ({ onChangeTheme }) => {
  const [title, setTitle] = React.useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm();
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
      <LdHeading level="2" class="mb-ld-32">
        Hi there 👋
      </LdHeading>

      <LdParagraph class="mb-ld-16">
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
      <LdParagraph class="mb-ld-24">
        Let's change the theme of the app first:
      </LdParagraph>

      <LdLabel class="mb-ld-32 w-full">
        App Theme
        <LdSelect
          onChange={
            ((
              event: React.SyntheticEvent<
                HTMLInputElement,
                CustomEvent<ThemeName[]>
              >
            ) => onChangeTheme(event.nativeEvent.detail[0])) as unknown as any
          }
          placeholder="Pick a theme"
          prevent-deselection
        >
          <LdOption value="ocean" selected>
            Ocean
          </LdOption>
          <LdOption value="bubblegum">Bubblegum</LdOption>
          <LdOption value="shake">Shake</LdOption>
          <LdOption value="solvent">Solvent</LdOption>
          <LdOption value="tea">Tea</LdOption>
        </LdSelect>
      </LdLabel>

      <LdParagraph class="mb-ld-24">
        Next we have set up some form validation:
      </LdParagraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-ld-32">
        <LdLabel>
          <span className="flex justify-between">
            Your title (optional)
            <LdTooltip arrow position="top right" class="h-1">
              <LdParagraph>
                We are asking because we'd like to address you correctly.
              </LdParagraph>
            </LdTooltip>
          </span>
          <LdSelect
            onInput={
              // TODO: React bindings
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
            {...register("title", {
              value: title,
            })}
          >
            {titles.map((title) => (
              <LdOption key={title} value={title}>
                {title}
              </LdOption>
            ))}
          </LdSelect>
          <LdInputMessage class={title ? undefined : "invisible"} mode="valid">
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
          {errors.fullName ? (
            <LdInputMessage mode="error" key="error">
              Your full name is required.
            </LdInputMessage>
          ) : (
            <LdInputMessage
              class={errors.fullName ? undefined : "invisible"}
              mode="valid"
              key="success"
            >
              Lovely name.
            </LdInputMessage>
          )}
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
          {errors.website ? (
            <LdInputMessage mode="error">
              {errors.website?.type === "required" &&
                "Your email address is required."}
              {errors.website?.type === "pattern" &&
                "This email address is invalid."}
            </LdInputMessage>
          ) : (
            <LdInputMessage
              class={dirtyFields.email ? undefined : "invisible"}
              mode="valid"
            >
              Lovely email address.
            </LdInputMessage>
          )}
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
          {errors.website ? (
            <LdInputMessage mode="error">This URL is invalid.</LdInputMessage>
          ) : (
            <LdInputMessage
              class={dirtyFields.website?.value ? undefined : "invisible"}
              mode="valid"
            >
              You even have a website! 👍
            </LdInputMessage>
          )}
        </LdLabel>
      </div>

      <LdLabel class="w-full mb-ld-32">
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
