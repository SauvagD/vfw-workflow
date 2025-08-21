import { Box } from '@mantine/core';
import classes from './widget.module.css';
import type { BoxProps } from '@mantine/core';
import type React from 'react';

const Widget = ({ children, ...boxProps }: { children: React.ReactNode } & BoxProps) => {
  return <Box className={classes.root} {...boxProps}>{children}</Box>
}

export default Widget
