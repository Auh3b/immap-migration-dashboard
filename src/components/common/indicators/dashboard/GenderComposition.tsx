import { AggregationTypes, groupValuesByColumn } from '@carto/react-core';
import { FormulaWidgetUI, PieWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { Divider, Grid, makeStyles } from '@material-ui/core';
import useLayerSelector from 'hooks/useLayerSelector';
import useLayerSourceSelector from 'hooks/useLayerSourceSelector';
import useWidgetFetch from 'hooks/useWidgetFetch';
import { ReactComponent as Woman } from 'assets/img/person-0.svg';
import { ReactComponent as Man } from 'assets/img/person-1.svg';
import { useMemo, useState } from 'react';
import { format, sum } from 'd3';

const PRIMARY_COLUMN = 'genero';
const SECONDARY_COLUMN = 'rango_edad';

function groupGenderByAge(data: any[], column: string) {
  return groupValuesByColumn({
    data,
    keysColumn: SECONDARY_COLUMN,
    valuesColumns: [column],
    operation: AggregationTypes.COUNT,
  });
}

function getGenderData(input: any[], column: string): any[] | null {
  if (input.length == 0) {
    return null;
  }

  const men = input.filter((i) => i[column] === 'Hombre');
  const women = input.filter((i) => i[column] === 'Mujer');

  return [groupGenderByAge(men, column), groupGenderByAge(women, column)];
}

const useGenderStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  icon: {
    objectFit: 'contain',
  },

  iconSmall: {
    height: '50px',
    objectFit: 'contain',
  },
  general: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function GenderComposition() {
  const classes = useGenderStyles();
  const { hotspotsLayer } = useLayerSelector();
  const source = useLayerSourceSelector(hotspotsLayer);

  const { data, error, isLoading } = useWidgetFetch({
    source,
    column: PRIMARY_COLUMN,
    method: getGenderData,
  });

  return (
    <Grid item>
      <WrapperWidgetUI title='Porcentaje de género/edad' loading={isLoading}>
        {/*@ts-ignore*/}
        {data && <GendersByPercentage data={data} />}
        <Divider className={classes.divider} />
        {data?.map((gender, index) => (
          <GenderByAge
            key={index + Math.random()}
            data={gender}
            index={index}
          />
        ))}
      </WrapperWidgetUI>
    </Grid>
  );
}

function GenderByAge({ data, index }: { data: any[]; index: number }) {
  const classes = useGenderStyles();
  return (
    <Grid container className={classes.main}>
      <Grid item xs={4}>
        {index ? (
          <Man className={classes.icon} />
        ) : (
          <Woman className={classes.icon} />
        )}
      </Grid>
      <Grid item xs={8}>
        <PieWidgetUI data={data} />
      </Grid>
    </Grid>
  );
}

function GendersByPercentage({ data }: { data: [any[], any[]] }) {
  const classes = useGenderStyles();
  const [men, setMen] = useState(0);
  const [women, setWomen] = useState(0);
  const [total, setTotal] = useState(0);

  useMemo(() => {
    const menValue = sum(data[1], (v) => v.value);
    setMen(menValue);
    const womenValue = sum(data[0], (v) => v.value);
    setWomen(womenValue);
    const totalValue = menValue + womenValue;
    setTotal(totalValue);
  }, [data]);

  return (
    <>
      {men && women && total && (
        <Grid container className={classes.main}>
          <Grid container item xs={6} className={classes.main}>
            <Grid item xs={3}>
              <Woman className={classes.iconSmall} />
            </Grid>
            <Grid item xs={9}>
              <FormatedNumber number={women} total={total} />
            </Grid>
          </Grid>
          <Grid container item xs={6} className={classes.main}>
            <Grid item xs={3}>
              <Man className={classes.iconSmall} />
            </Grid>
            <Grid item xs={9}>
              <FormatedNumber number={men} total={total} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

function FormatedNumber({ number, total }: { number: number; total: number }) {
  return (
    <FormulaWidgetUI
      data={number}
      formatter={(value: number) =>
        `${value} (${format('.0%')(value / total)})`
      }
    />
  );
}
