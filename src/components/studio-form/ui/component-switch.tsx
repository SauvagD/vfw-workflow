import { createContext, useContext } from 'react'

const ComponentSwitchContext = createContext<string>('default')

export const ComponentSwitch = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  return (
    <ComponentSwitchContext.Provider value={value}>
      {children}
    </ComponentSwitchContext.Provider>
  )
}

export const ComponentSwitchCase = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const selectedValue = useContext(ComponentSwitchContext)
  if (value !== selectedValue) {
    return
  }
  return children
}
