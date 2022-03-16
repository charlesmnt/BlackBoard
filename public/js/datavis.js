
var ctx = document.getElementById("myChart");

new Chart(ctx, {
 type: 'bar',
 data: {
   labels: ["Homme", "Femme"] ,
   datasets: [{

     data: [0,ctx.dataset.count1, ctx.dataset.count2] ,
     backgroundColor: [

      '#fd79a8',

      '#ffeaa7',

    ],
    borderWidth: 1
   
   }]
 }
});

var mail = document.getElementById("myMail");

new Chart(mail, {

  type: 'doughnut',
  data: {
    labels: ["Mail lu", "Mail non lu"] ,
    datasets: [{
 
      data: [mail.dataset.read, mail.dataset.unread] ,
      backgroundColor: [
 
       '#55efc4',
 
       '#e17055',
 
     ],
 
     borderWidth: 1
    
    }]
  }
 });

 var order = document.getElementById("order");

new Chart(order, {

  type: 'pie',
  data: {
    labels: ["Payée/Expédiée", "Payée/Non Expédiée"] ,
    datasets: [{
 
      data: [order.dataset.ship, order.dataset.unship] ,
      backgroundColor: [
 
       '#55efc4',
 
       '#e17055',
 
     ],
 
     borderWidth: 1
    
    }]
  }
 });

 