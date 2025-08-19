import StudioWidget from '@/components/studio-form/layout/studio/studio-widget';
import { Affix } from '@mantine/core';
import classes from './app-layout.module.css';

const AppLayout = ({ children, studio }: { children: React.ReactNode; studio: any }) => {
  return (
    <div className={classes.root}>
      <Affix position={{ top: 20, left: 20 }}>
        <StudioWidget {...studio} />
      </Affix>
      <div className={classes.body}>
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  )
}

export default AppLayout
