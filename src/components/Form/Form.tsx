import * as React from "react";
import { ThemeName } from "@emdgroup-liquid/liquid/dist/types/components/ld-theme/ld-theme";
import { Controller, useForm } from "react-hook-form";
import { titles } from "./titles";

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
          content: (
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
                </a>
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
      <ld-heading level="2" class="mb-ld-32">
        Hi there 👋
      </ld-heading>

      <ld-paragraph class="mb-ld-16">
        This small sandbox app demonstrates{" "}
        <a
          className="font-bold hover:underline"
          href="https://emdgroup-liquid.github.io/liquid/"
          rel="noreferrer"
          target="_blank"
        >
          Liquid Oxygen
        </a>{" "}
        used in combination with Vue 3, Typescript, Tailwind CSS and Vite.
      </ld-paragraph>
      <ld-paragraph class="mb-ld-24">
        Let's change the theme of the app first:
      </ld-paragraph>

      <ld-label class="mb-ld-32 w-full">
        App Theme
        <ld-select
          onChange={(ev: Event) => onChangeTheme((ev as CustomEvent).detail[0])}
          placeholder="Pick a theme"
          prevent-deselection
        >
          <ld-option value="ocean" selected>
            Ocean
          </ld-option>
          <ld-option value="bubblegum">Bubblegum</ld-option>
          <ld-option value="shake">Shake</ld-option>
          <ld-option value="solvent">Solvent</ld-option>
          <ld-option value="tea">Tea</ld-option>
        </ld-select>
      </ld-label>

      <ld-paragraph class="mb-ld-24">
        Next we have set up some form validation:
      </ld-paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-ld-32">
        <ld-label>
          <span className="flex justify-between">
            Your title (optional)
            <ld-tooltip arrow position="top right" class="h-1">
              <ld-paragraph>
                We are asking because we'd like to address you correctly.
              </ld-paragraph>
            </ld-tooltip>
          </span>
          <ld-select
            onInput={(event: CustomEvent) => {
              setTitle(event.detail[0]);
            }}
            placeholder="No title"
            {...register("title", {
              value: title,
            })}
          >
            {titles.map((title) => (
              <ld-option key={title} value={title}>
                {title}
              </ld-option>
            ))}
          </ld-select>
          <ld-input-message
            class={title ? undefined : "invisible"}
            mode="valid"
          >
            Good pick.
          </ld-input-message>
        </ld-label>

        <ld-label>
          Your full name
          <ld-input
            placeholder="e.g. Jason Parse"
            tone="dark"
            {...register("fullName", {
              required: true,
            })}
          />
          {errors.fullName ? (
            <ld-input-message mode="error">
              Your full name is required.
            </ld-input-message>
          ) : (
            <ld-input-message
              class={errors.fullName ? undefined : "invisible"}
              mode="valid"
            >
              Lovely name.
            </ld-input-message>
          )}
        </ld-label>

        <ld-label>
          Your email address
          <ld-input
            type="email"
            placeholder="e.g. jason.parse@example.com"
            tone="dark"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.website ? (
            <ld-input-message mode="error">
              {errors.website?.type === "required" &&
                "Your email address is required."}
              {errors.website?.type === "pattern" &&
                "This email address is invalid."}
            </ld-input-message>
          ) : (
            <ld-input-message
              class={dirtyFields.email ? undefined : "invisible"}
              mode="valid"
            >
              Lovely email address.
            </ld-input-message>
          )}
        </ld-label>

        <ld-label>
          Your website (optional)
          <ld-input
            type="url"
            placeholder="e.g. https://example.com"
            tone="dark"
            {...register("website", {
              pattern: /^(https?:\/\/.*)?$/,
            })}
          />
          {errors.website ? (
            <ld-input-message mode="error">
              This URL is invalid.
            </ld-input-message>
          ) : (
            <ld-input-message
              class={dirtyFields.website?.value ? undefined : "invisible"}
              mode="valid"
            >
              You even have a website! 👍
            </ld-input-message>
          )}
        </ld-label>
      </div>

      <ld-label class="w-full mb-ld-32">
        Comment (optional)
        <ld-input
          multiline
          placeholder="Be creative!"
          value=""
          tone="dark"
          style={{ minHeight: "7rem" }}
        />
      </ld-label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-ld-24 items-center">
        <ld-label position="right" size="m">
          <span className={errors.termsAccepted ? "text-rr" : undefined}>
            I accept the terms (none).
          </span>
          <ld-checkbox
            tone="dark"
            {...register("termsAccepted", {
              required: true,
            })}
          />
        </ld-label>

        <div className="grid grid-cols-2 gap-ld-16">
          <ld-button onClick={handleCancel} type="button" mode="secondary">
            Cancel
          </ld-button>
          <ld-button onClick={handleSubmit} type="submit">
            Submit
          </ld-button>
        </div>
      </div>
    </form>
  );
};

export default Form;
