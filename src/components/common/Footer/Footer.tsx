'use client';

import {Box, Divider, Stack, Typography} from '@mui/material';

import {MAX_WIDTH_COMMON_LAYOUT, TG_LINK, VK_LINK} from '@/config/common';

const Footer = () => {
  return (
    <Box sx={{width: '100%', maxWidth: MAX_WIDTH_COMMON_LAYOUT, margin: 'auto', mb: 4}}>
      <Divider sx={{margin: 'auto', mt: 4, mb: 3}} />
      <Stack spacing={3}>
        <Typography variant="body1" component="div" align="center">
          Если не получилось найти какой-то парфюм, напишите мне, на сайте не полный ассортимент, по факту, нужный вам парфюм может быть в наличии.
        </Typography>
        <Stack direction="row" alignItems="flex-end" justifyContent="space-between" spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h6" component="div" sx={{fontWeight: 600}}>
              My ParfStore
            </Typography>
            <Typography variant="body2" component="div">
              Оригинальная парфюмерия по&nbsp;лучшим&nbsp;ценам
            </Typography>
          </Stack>
          <Typography variant="body2" component="div" align="right">
            Связаться со мной в:
            <br />
            <a href={TG_LINK} target="_blank">
              @Telegram
            </a>
            &nbsp;или&nbsp;
            <a href={VK_LINK} target="_blank">
              Группа&nbsp;ВК
            </a>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
