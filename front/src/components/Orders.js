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

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', '10000000001', 'CARTÃO', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', '10000000002', 'A VISTA', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', '10000000003', 'A VISTA', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', '10000000004', 'CARTÃO', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', '10000000005', 'A VISTA', 212.79),
];

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
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.cliente}</TableCell>
              <TableCell>{row.metodo}</TableCell>
              <TableCell align="right">{row.valor}</TableCell>
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