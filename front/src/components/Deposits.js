import React from 'react';
// import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { Link } from 'react-router-dom';
import api from '../services/api';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [updated, setUpdated] = React.useState(true);
  const [totalReceived, setTotalReceived] = React.useState(0.0);
  const [dateNow, setDateNow] = React.useState(new Date());
  React.useEffect(() => {
    if (updated) {
      (async () => {
        const response = await api.get('/sale/today');

        const returned = await JSON.stringify(response.data.vendas);
        const vendas = await JSON.parse(returned);

        let received = 0;

        vendas.map((item) => {
          received += parseFloat(item.valor)
        });

        // this.setState({ vendas: vendas });
        setTotalReceived(received);
        setUpdated(false);
      })();
    }
  });
  return (
    <React.Fragment>
      <Title>Entradas de Hoje</Title>
      <Typography component="p" variant="h4">
        {totalReceived.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`${dateNow.getDate()}/${dateNow.getMonth() + 1 < 10 ? "0" + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1}/${dateNow.getFullYear()}`}
      </Typography>
      <div>
        <Link color="primary" to="/cart/history" >
          Veja Todas as Vendas
        </Link>
      </div>
    </React.Fragment>
  );
}