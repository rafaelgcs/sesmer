import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import api from '../services/api';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [vendas, setVendas] = React.useState([]);

  React.useEffect(() => {

    if (vendas.length == 0) {
      (async () => {
        const response = await api.get('/sale/recents');

        const returned = await JSON.stringify(response.data.vendas);
        const vendas = await JSON.parse(returned);

        let saveVendas = [];

        vendas.map((item) => {
          saveVendas.push({
            id: item.id,
            data: `${item.dia_venda}/${item.mes_venda}/${item.ano_venda} ${item.hora_venda}`,
            cliente: item.cliente,
            codigoVenda: item.id,
            metodo: item.metodo,
            valor: item.valor
          });
        });

        setVendas(vendas);
      })();
    }

  });


  return (
    <React.Fragment>
      <Title>Vendas Recentes</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Código da venda</TableCell>
            <TableCell>Método de pagamento</TableCell>
            <TableCell align="right">Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendas.map(row => (
            <TableRow key={row.id}>
              <TableCell>{`${row.dia_venda}/${row.mes_venda > 10 ? "0"+row.mes_venda : row.mes_venda}/${row.ano_venda} ${row.hora_venda}`}</TableCell>
              <TableCell>{row.cliente}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.metodo}</TableCell>
              <TableCell align="right">{parseFloat(row.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Veja todas as vendas...
        </Link>
      </div>
    </React.Fragment>
  );
}