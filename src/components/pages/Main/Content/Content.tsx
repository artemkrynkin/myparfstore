'use client';

import React from 'react';

import {matchSorter} from 'match-sorter';
import {VariableSizeList, ListChildComponentProps} from 'react-window';

import {Box, Typography, Divider, Autocomplete, AutocompleteProps, ListSubheader, useMediaQuery, Stack} from '@mui/material';
import {red as MuiColorRed} from '@mui/material/colors';

import {MAX_WIDTH_COMMON_LAYOUT, TG_LINK, VK_LINK} from '@/config/common';

import {SearchTextField} from './styles';

interface ContentProps {
  perfumes: Perfume[];
}

const LISTBOX_PADDING = 8; // px

function renderRow(props: ListChildComponentProps) {
  const {data, index, style} = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const {key, ...otherProps} = dataSet[0];

  return (
    <Typography key={key + dataSet[1].id} component="li" {...otherProps} noWrap style={inlineStyle}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{width: '100%'}}>
        <Typography variant="subtitle1" component="div" sx={{textOverflow: 'ellipsis', overflowX: 'hidden'}}>
          {dataSet[1].name}
        </Typography>
        <Typography variant="subtitle1" component="div" sx={{color: MuiColorRed[600], fontWeight: 600}}>
          ${dataSet[1].price}
        </Typography>
      </Stack>
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});
OuterElementType.displayName = 'OuterElementType';

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(function ListboxComponent(props, ref) {
  const {children, ...other} = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach((item: React.ReactElement & {children?: React.ReactElement[]}) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });
  const itemCount = itemData.length;
  const itemSize = 48;

  const getChildSize = (child: React.ReactElement) => {
    if (child.hasOwnProperty('group')) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const filterOptions = (options: Perfume[], {inputValue}: {inputValue: string}) => matchSorter(options, inputValue, {keys: ['name']});

const Content: React.FC<ContentProps> = ({perfumes}) => {
  return (
    <Box sx={{width: '100%', maxWidth: MAX_WIDTH_COMMON_LAYOUT, margin: 'auto', mt: 'initial'}}>
      <Divider sx={{margin: 'auto', mt: 3, mb: 3}} />
      <Typography variant="h6" component="div" align="center" gutterBottom sx={{fontWeight: 600}}>
        Воспользуйтесь поисковой строкой ниже,
        <br />
        чтобы найти нужный аромат и узнать цену.
      </Typography>
      <Typography variant="body2" component="div" align="center" gutterBottom>
        Выбрав аромат, напишите мне в телеграм:{' '}
        <a href={TG_LINK} target="_blank">
          @Telegram
        </a>{' '}
        или в{' '}
        <a href={VK_LINK} target="_blank">
          сообщения сообщества BK
        </a>
      </Typography>
      <Autocomplete
        disableListWrap
        options={perfumes}
        sx={{mt: 2, mb: 0.5, width: '100%'}}
        noOptionsText="Вариантов не найдено"
        ListboxComponent={ListboxComponent}
        getOptionLabel={(option) => `${option.name} / $${option.price}`}
        groupBy={(option) => option.name[0].toUpperCase()}
        renderInput={(params) => <SearchTextField {...params} placeholder="Начните вводить название аромата" />}
        filterOptions={filterOptions}
        renderOption={(props, option, state) => [props, option, state.index] as React.ReactNode}
        renderGroup={(params) => params as any}
      />
      <Typography variant="body2" component="div" align="center">
        Цена может незначительно отличаться, в&nbsp;зависимости&nbsp;от&nbsp;курса&nbsp;доллара,
        <br />
        актуальную цену озвучу при&nbsp;оформлении заказа.
      </Typography>
    </Box>
  );
};

export default Content;
