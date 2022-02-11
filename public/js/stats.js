var barChartData = {
        labels: ['2001','2002','2003'],
        datasets: [{
            label: 'User',
            backgroundColor: "pink",
            data: ['1','2','3']
        }]
    };
var data = {
        labels: ['2001','2002','2003'],
        datasets: [
          {
            label: "Users Count",
            data: ['1','2','3'],
            backgroundColor: [
              "#DEB887",
              "#A9A9A9",
              "#DC143C",
              "#F4A460",
              "#2E8B57",
              "#1D7A46",
              "#CDA776",
            ],
            borderColor: [
              "#CDA776",
              "#989898",
              "#CB252B",
              "#E39371",
              "#1D7A46",
              "#F4A460",
              "#CDA776",
            ],
            borderWidth: [1, 1, 1, 1, 1,1,1]
          }
        ]
      };
      var options = {
        responsive: true,
        title: {
          display: true,
          position: "top",
          text: "Day Wise Count",
          fontSize: 18,
          fontColor: "#111"
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#333",
            fontSize: 16
          }
        }
      };
    window.onload = function() {
        var ctx = document.getElementById("canvas").getContext("2d");
        var ctx1 = document.getElementById("canvas1").getContext("2d");
        window.myBar = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                elements: {
                    rectangle: {
                        borderWidth: 2,
                        borderColor: '#c1c1c1',
                        borderSkipped: 'bottom'
                    }
                },
                responsive: true,
                title: {
                    display: true,
                    text: 'Yearly User Joined'
                }
            }
        });
        var chart1 = new Chart(ctx1, {
        type: "pie",
        data: data,
        options: options
      });
};


 
      //options
      
 
      //create Pie Chart class object
      
 
