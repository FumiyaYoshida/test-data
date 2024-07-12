import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [600, 200, 900, 300, 100, 800, 700],
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: [300, 500, 400, 400, 910, 200, 800],
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };
function App() {
  const [loading, setLoading] = useState(true);
  const [dtList, setDtList] = useState<string[]>([]);
  const [tempList, setTempList] = useState<number[]>([]);
  const [humiList, setHumiList] = useState<number[]>([]);
  // fetch("https://jk6k05y5fl.execute-api.ap-northeast-1.amazonaws.com/wip2/get-json")
  //  .then((res) => res.json())
  //  .then((json) => console.log(json.body.datas))
  //  .then((json) => {
  //   setDtList(json.body.datas.map((data: any) => data.datetime))
  //   setTempList(json.body.datas.map((data: any) => data.value))
  //  })
  //  .catch(() => alert("error"));
  useEffect(() => {
    async function fetchData() {
      
      const response = await fetch('https://jk6k05y5fl.execute-api.ap-northeast-1.amazonaws.com/wip2/get-json');
      const datas = await response.json();

      console.log(datas)
      setDtList(datas.body.data.map((data: any) => data.datetime));
      setTempList(datas.body.data.map((data: any) => data.temperature));
      setHumiList(datas.body.data.map((data: any) => data.humidity));
    }
    fetchData();
    setLoading(false);
  }, []);

 const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temprature',
      },
    },
    scales: {
    }
  };
  
  const labels = dtList;
  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const temp_data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: tempList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
  const humi_data = {
    labels,
    datasets: [
      {
        label: 'Dataset 2',
        data: humiList,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };
  
  return (
    <main className="mx-auto mt-10 max-w-xl">
      <h1 className="text-center text-4xl">Dataアプリ</h1>
      {
        loading ? (
          <h3 className="text-center text-xl">Loading</h3>
        ) : <>
          {/* <Bar options={options} data={data} /> */}
          <Line options={options} data={temp_data} />
          <Line options={options} data={humi_data} />
        </>
      }
    </main>
  );
}

export default App;
