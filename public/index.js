async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');


    // let data = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=44924b3388f340179f8ea015ef7cb09f')
    // let result = await data.json()
    //  console.log(result)

   const { GME, MSFT, DIS, BNTX } = mockData;

   const stocks = [GME, MSFT, DIS, BNTX];
//    console.log(stocks[0].values)
   
   function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

stocks.forEach(stock => stock.values.reverse())
// var ctx = document.getElementById('myChart').getContext('2d');
new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map(stock =>({    
            label: stock.meta.symbol,
            data:stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol)
          }))
            // borderWidth: 1
        
     },
    // options: {
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     }
    // }
});

                                                 
// stocks[0].values.map(value => value.datetime )
new Chart(highestPriceChartCanvas.getContext('2d'),{

    type:'bar',
    data:{
    labels:stocks.map(stock => stock.meta.symbol), 
    datasets: stocks.map(stock =>({  
    label: stock.meta.symbol,  
    data:stocks.map(stock=> findLargest(stock)),
    backgroundColor: getColor(stock.meta.symbol),
    borderColor: getColor(stock.meta.symbol)
    }))
    }
})
function findLargest(item){
    let arr = item.values.map(c => parseFloat(c.high))
    console.log(arr)
//     let high = 0;
// for (let num in arr){
   
//     if (arr[num] > high){
//         high = arr[num]
   let high = Math.max(...arr)     
   console.log(high)
   return high
    }
//   }

// }
findLargest(stocks[0])
console.log(stocks.map(stock => stock.meta.symbol))
}

main()
