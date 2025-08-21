import { Text } from '@mantine/core'
import classes from './answer-card.module.css'
import type React from 'react'


type AnswerCardProps = {
  title: string
  description: string
  onClick: () => void
  children: React.ReactNode
}

const AnswerCard = ({
  title,
  description,
  onClick,
  children,
}: AnswerCardProps) => {
  return (
    <div className={classes.root} onClick={onClick}>
      {children}
      <div className={classes.content}>
        <Text fz={20} fw={500}>{title}</Text>
        {description && <Text fz={12} fw={500} c="dark">{description}</Text>}
      </div>
    </div>
  )
}

export default AnswerCard
