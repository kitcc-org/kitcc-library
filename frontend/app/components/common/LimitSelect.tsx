import { NativeSelect } from '@mantine/core'

interface LimitSelectProps {
  value?: number
  handleLimitChange: (newLimit: number) => void
}

const LimitSelect = ({ value, handleLimitChange }: LimitSelectProps) => {
  return (
    <NativeSelect
      value={value ?? '10'}
      label={'表示件数'}
      data={['5', '10', '25', '50']}
      onChange={(event => handleLimitChange(Number(event.currentTarget.value)))}
    />
  )
}

export default LimitSelect