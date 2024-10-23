import { NativeSelect } from '@mantine/core'
import React from 'react'

interface LimitSelectProps {
  value: number | undefined
  handleLimitChange: (newLimit: number) => void
}

const LimitSelect = ({ value, handleLimitChange }: LimitSelectProps) => {
  return (
    <NativeSelect
      value={(!value || Number.isNaN(value)) ? '10' : value}
      label={'表示件数'}
      data={['5', '10', '25', '50']}
      onChange={(event => handleLimitChange(Number(event.currentTarget.value)))}
    />
  )
}

export default LimitSelect