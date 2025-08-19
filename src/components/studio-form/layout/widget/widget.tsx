import type { BoxProps } from '@mantine/core';
import { Box } from '@mantine/core';
import type React from 'react';
import classes from './widget.module.css';

const Widget = ({ children, ...boxProps }: { children: React.ReactNode } & BoxProps) => {
  return <Box className={classes.root} {...boxProps}>{children}</Box>
}

export default Widget
