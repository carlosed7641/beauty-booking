import { useSteps } from '../../store'
import { WorkDays } from '..'

export const StepFive = () => {
  const data = useSteps(state => state.data)
  const setData = useSteps(state => state.setData)

  return (
    <WorkDays
      data={data}
      setData={setData}
      workdays={data.workdays}
    />
  )
}