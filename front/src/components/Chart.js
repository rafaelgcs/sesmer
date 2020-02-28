// import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
// import Title from './Title';

// // Generate Sales Data
// function createData(time, amount) {
//   return { time, amount };
// }

// const data = [
//   createData('00:00', 0),
//   createData('03:00', 300),
//   createData('06:00', 600),
//   createData('09:00', 800),
//   createData('12:00', 1500),
//   createData('15:00', 2000),
//   createData('18:00', 2400),
//   createData('21:00', 2400),
//   createData('24:00', undefined),
// ];

// export default function Chart() {
//   const theme = useTheme();

//   return (
//     <React.Fragment>
//       <Title>Today</Title>
//       <ResponsiveContainer>
//         <LineChart
//           data={data}
//           margin={{
//             top: 16,
//             right: 16,
//             bottom: 0,
//             left: 24,
//           }}
//         >
//           <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
//           <YAxis stroke={theme.palette.text.secondary}>
//             <Label
//               angle={270}
//               position="left"
//               style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
//             >
//               Sales ($)
//             </Label>
//           </YAxis>
//           <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
//         </LineChart>
//       </ResponsiveContainer>
//     </React.Fragment>
//   );
// }

import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import api from '../services/api';

const CustomTooltip = ({ active, payload, label }) => {
  console.log(payload);
  if (active) {
    if (payload != null) {

      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#00000070', borderRadius: 3, color: 'white' }}>
          <p className="label">{`Valor Vendido Por "${payload != null && payload[0].payload.vendedor}" : ${payload != null && parseFloat(payload[0].value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}</p>
        </div>
      );
    } else {
      return null;
    }
  }

  return null;
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/vxq4ep63/';
  state = {
    vendas: [],

  };

  async componentDidMount() {
    const response = await api.get('/sale/today');

    const returned = await JSON.stringify(response.data.vendas);
    const vendas = await JSON.parse(returned);

    let saveVendas = [];

    vendas.map((item) => {

      saveVendas.push({
        id: item.id,
        name: item.cliente,
        label: item.cliente,
        data: `${item.dia_venda}/${item.mes_venda}/${item.ano_venda} ${item.hora_venda}`,
        cliente: item.cliente,
        codigoVenda: item.id,
        metodo: item.metodo,
        valor: item.valor
      });
    });

    this.setState({ vendas: vendas });
  }

  render() {
    return (
      <BarChart
        width={700}
        height={250}
        data={this.state.vendas}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="vendedor" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="valor" barSize={20} fill="green" />
      </BarChart>
    );
  }
}
