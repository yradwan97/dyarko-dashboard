import { useState, Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { t } from 'i18next'

function Toggle() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch checked={enabled} onChange={setEnabled} as={Fragment}>
      {({ checked }) => (
        /* Use the `checked` state to conditionally style the button. */
        <button
          className={`${
            checked ? 'bg-main-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">{t("pages.settings.toggle-notifications")}</span>
          <span
            className={`${
              checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      )}
    </Switch>
  )
}

export default Toggle