import { titles } from './titles'
import {
  LdButton,
  LdCheckbox,
  LdInput,
  LdInputMessage,
  LdLabel,
  LdOption,
  LdSelect,
  LdTooltip,
  LdTypo,
} from '@emdgroup-liquid/liquid/dist/react'
import * as React from 'react'
import ReactDOMServer from 'react-dom/server'
import { useForm } from 'react-hook-form'

type FormProps = {
  onChangeTheme: (theme: string) => void
}

const themeOptions: { label: string; value: string }[] = [
  { value: 'ocean', label: 'Ocean' },
  { value: 'bubblegum', label: 'Bubblegum' },
  { value: 'shake', label: 'Shake' },
  { value: 'solvent', label: 'Solvent' },
  { value: 'tea', label: 'Tea' },
]

const Form: React.FC<FormProps> = ({ onChangeTheme }) => {
  const [theme, setTheme] = React.useState<string>('ocean')
  const [title, setTitle] = React.useState<string>()
  const { formState, getValues, handleSubmit, register, setValue } = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  })
  const { errors, dirtyFields } = formState
  const isFormDirty = formState.submitCount > 0

  const handleCancel = React.useCallback<
    React.MouseEventHandler<HTMLLdButtonElement>
  >(() => {
    dispatchEvent(new CustomEvent('ldNotificationClear'))
    dispatchEvent(
      new CustomEvent('ldNotificationAdd', {
        detail: {
          content: "This button doesn't really do anything. 👻",
          type: 'warn',
        },
      })
    )
  }, [])
  const handleFormSubmit = React.useCallback(() => {
    dispatchEvent(new CustomEvent('ldNotificationClear'))
    dispatchEvent(
      new CustomEvent('ldNotificationAdd', {
        detail: {
          content: ReactDOMServer.renderToStaticMarkup(
            <div>
              <div>Thanks! We hope you like this sandbox. 🤗</div>
              <div>
                <a
                  className="font-bold hover:underline"
                  style={{ color: 'inherit' }}
                  href="https://github.com/emdgroup-liquid/liquid/discussions"
                  target="_blank"
                  rel="noreferrer"
                >
                  <b>Reach out</b>
                </a>{' '}
                if you have any questions!
              </div>
            </div>
          ),
          type: 'info',
          timeout: 0,
        },
      })
    )
  }, [])
  const handleFormInvalid = React.useCallback(() => {
    dispatchEvent(new CustomEvent('ldNotificationClear'))
    dispatchEvent(
      new CustomEvent('ldNotificationAdd', {
        detail: {
          content: 'The form is invalid! 😱',
          type: 'alert',
        },
      })
    )
  }, [])

  return (
    <form
      autoComplete="off"
      className="bg-wht rounded-l shadow-hover p-ld-32"
      data-testid="form"
      onSubmit={handleSubmit(handleFormSubmit, handleFormInvalid)}
    >
      <LdTypo className="mb-ld-32" variant="h2">
        Hi there 👋
      </LdTypo>

      <LdTypo className="mb-ld-16">
        This small sandbox app demonstrates{' '}
        <a
          className="font-bold hover:underline"
          href="https://emdgroup-liquid.github.io/liquid/"
          rel="noreferrer"
          target="_blank"
        >
          Liquid Oxygen
        </a>{' '}
        used in combination with React, Typescript and Tailwind CSS.
      </LdTypo>
      <LdTypo className="mb-ld-24">
        Let&apos;s change the theme of the app first:
      </LdTypo>

      <LdLabel className="mb-ld-32 w-full">
        App Theme
        <LdSelect
          onLdchange={(ev: CustomEvent) => {
            setTheme(ev.detail[0])
            onChangeTheme(ev.detail[0])
          }}
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

      <LdTypo className="mb-ld-24">
        Next we have set up some form validation:
      </LdTypo>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-ld-24 mb-ld-32">
        <LdLabel>
          <span className="flex justify-between">
            Your title (optional)
            <LdTooltip arrow position="top right" className="h-1">
              <LdTypo>
                We are asking because we&apos;d like to address you correctly.
              </LdTypo>
            </LdTooltip>
          </span>
          <LdSelect
            onLdchange={(ev: CustomEvent) => {
              setTitle(ev.detail[0])
            }}
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
            className={title ? 'visible' : 'invisible'}
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
            {...register('name', {
              required: true,
            })}
            onInput={(ev: React.FormEvent<HTMLLdInputElement>) => {
              setValue('name', (ev.target as HTMLLdInputElement).value, {
                shouldValidate: isFormDirty || dirtyFields.name,
              })
            }}
            onBlur={(ev: React.FormEvent<HTMLLdInputElement>) => {
              setValue('name', (ev.target as HTMLLdInputElement).value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            invalid={!!errors.name}
          />
          <LdInputMessage
            className={
              errors.name || getValues('name') ? 'visible' : 'invisible'
            }
            mode={errors.name ? 'error' : 'valid'}
          >
            {errors.name
              ? 'Your full name is required.'
              : getValues('name')
              ? 'Lovely name.'
              : '&nbsp;'}
          </LdInputMessage>
        </LdLabel>

        <LdLabel>
          Your email address
          <LdInput
            type="email"
            placeholder="e.g. jason.parse@example.com"
            tone="dark"
            {...register('email', {
              required: true,
              pattern: /\S+@\S+\.\S+/,
            })}
            onInput={(ev: React.FormEvent<HTMLLdInputElement>) => {
              setValue('email', (ev.target as HTMLLdInputElement).value, {
                shouldValidate: isFormDirty || dirtyFields.email,
              })
            }}
            onBlur={(ev: React.FormEvent<HTMLLdInputElement>) => {
              setValue('email', (ev.target as HTMLLdInputElement).value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            invalid={!!errors.email}
          />
          <LdInputMessage
            className={
              errors.email || getValues('email') ? 'visible' : 'invisible'
            }
            mode={errors.email ? 'error' : 'valid'}
          >
            {errors.email?.type === 'required'
              ? 'Your email address is required.'
              : errors.email?.type === 'pattern'
              ? 'This email address is invalid.'
              : !errors.email && getValues('email')
              ? 'Lovely email address.'
              : '&nbsp;'}
          </LdInputMessage>
        </LdLabel>

        <LdLabel>
          Your website (optional)
          <LdInput
            type="url"
            placeholder="e.g. https://example.com"
            tone="dark"
            {...register('website', {
              pattern:
                /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
            })}
            onInput={(ev: React.FormEvent<HTMLLdInputElement>) => {
              setValue('website', (ev.target as HTMLLdInputElement).value, {
                shouldValidate: isFormDirty || dirtyFields.website,
              })
            }}
            onBlur={(ev: React.FormEvent<HTMLLdInputElement>) => {
              setValue('website', (ev.target as HTMLLdInputElement).value, {
                shouldValidate: true,
                shouldDirty: true,
              })
            }}
            invalid={!!errors.website}
          />
          <LdInputMessage
            className={
              errors.website || getValues('website') ? 'visible' : 'invisible'
            }
            mode={errors.website ? 'error' : 'valid'}
          >
            {errors.website
              ? 'This URL is invalid.'
              : !errors.website && getValues('website')
              ? 'You even have a website! 👍'
              : '&nbsp;'}
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
          style={{ minHeight: '7rem' }}
        />
      </LdLabel>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-ld-24 items-center">
        <LdLabel position="right" size="m">
          <span className={errors.termsAccepted ? 'text-thm-error' : undefined}>
            I accept the terms (none).
          </span>
          <LdCheckbox
            tone="dark"
            invalid={!!errors.termsAccepted}
            {...register('termsAccepted', {
              required: true,
            })}
            onInput={(ev: React.FormEvent<HTMLLdCheckboxElement>) => {
              setValue(
                'termsAccepted',
                (ev.target as HTMLLdCheckboxElement).checked,
                { shouldValidate: true }
              )
            }}
          />
        </LdLabel>

        <div className="grid grid-cols-2 gap-ld-16">
          <LdButton onClick={handleCancel} mode="secondary" type="button">
            Cancel
          </LdButton>
          <LdButton>Submit</LdButton>
        </div>
      </div>
    </form>
  )
}

export default Form
