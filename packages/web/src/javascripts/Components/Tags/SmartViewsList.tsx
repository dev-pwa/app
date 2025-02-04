import { ViewControllerManager } from '@/Controllers/ViewControllerManager'
import { observer } from 'mobx-react-lite'
import { FunctionComponent } from 'react'
import SmartViewsListItem from './SmartViewsListItem'

type Props = {
  viewControllerManager: ViewControllerManager
}

const SmartViewsList: FunctionComponent<Props> = ({ viewControllerManager }: Props) => {
  const allViews = viewControllerManager.navigationController.smartViews

  return (
    <>
      {allViews.map((view) => {
        return (
          <SmartViewsListItem
            key={view.uuid}
            view={view}
            tagsState={viewControllerManager.navigationController}
            features={viewControllerManager.featuresController}
          />
        )
      })}
    </>
  )
}

export default observer(SmartViewsList)
