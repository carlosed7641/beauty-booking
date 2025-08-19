import { useSteps } from '../../store'
import { WorkDays } from '..'

export const StepFive = () => {
  const { data, setData } = useSteps()
  return (
    <WorkDays
      data={data}
      setData={setData}
      workdays={data.workdays}
    />
  )
}