import { useCallback, useRef } from 'react'
import { AlertDialog, AlertDialogDescription, AlertDialogLabel } from '@reach/alert-dialog'
import { WebApplication } from '@/Application/Application'
import { ViewControllerManager } from '@/Controllers/ViewControllerManager'
import { observer } from 'mobx-react-lite'
import Button from '@/Components/Button/Button'

type Props = {
  application: WebApplication
  viewControllerManager: ViewControllerManager
}

const ConfirmOtherSessionsSignOut = observer(({ application, viewControllerManager }: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const closeDialog = useCallback(() => {
    viewControllerManager.accountMenuController.setOtherSessionsSignOut(false)
  }, [viewControllerManager])

  return (
    <AlertDialog onDismiss={closeDialog} leastDestructiveRef={cancelRef} className="max-w-[600px] p-0">
      <div className="sk-modal-content">
        <div className="sn-component">
          <div className="sk-panel">
            <div className="sk-panel-content">
              <div className="sk-panel-section">
                <AlertDialogLabel className="sk-h3 sk-panel-section-title capitalize">
                  End all other sessions?
                </AlertDialogLabel>
                <AlertDialogDescription className="sk-panel-row">
                  <p className="text-foreground">
                    This action will sign out all other devices signed into your account, and remove your data from
                    those devices when they next regain connection to the internet. You may sign back in on those
                    devices at any time.
                  </p>
                </AlertDialogDescription>
                <div className="my-1 mt-4 flex gap-2">
                  <Button primary small colorStyle="neutral" rounded={false} ref={cancelRef} onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button
                    primary
                    small
                    colorStyle="danger"
                    rounded={false}
                    onClick={() => {
                      application.revokeAllOtherSessions().catch(console.error)
                      closeDialog()
                      application.alertService
                        .alert('You have successfully revoked your sessions from other devices.', undefined, 'Finish')
                        .catch(console.error)
                    }}
                  >
                    End Sessions
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AlertDialog>
  )
})

ConfirmOtherSessionsSignOut.displayName = 'ConfirmOtherSessionsSignOut'

const OtherSessionsSignOutContainer = (props: Props) => {
  if (!props.viewControllerManager.accountMenuController.otherSessionsSignOut) {
    return null
  }
  return <ConfirmOtherSessionsSignOut {...props} />
}

export default observer(OtherSessionsSignOutContainer)
