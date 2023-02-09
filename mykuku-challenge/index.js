const drawGraphic = (arr, delay) =>{
    //function to draw the graphics, the delay is for the 2nd graphic, cause the first has no animations

    //with max, i calculate the highest point of the array to calculate after where the points should be
    const max = arr.reduce((acc, [x, y]) => (acc > y ? acc : y), 0);
    const min = arr.reduce((acc, [x, y]) => (acc === 0) ? y : (acc < y ? acc : y), 0);

    const a = min
    const b = max
    
    const height = 96;
    const heightMin = 35;
    
    const c = heightMin
    const d = height
  
    const interval = 45;
    const padding = -7;
    const lineInterval = 14;

    const data = arr.map(([x, y], i) => {

        
        let originalValue = y
        
//        here we are doing a scale transformation
        y = (((d-c)*(y-a))/(b-a)) + c;
        
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        let tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
        let dashedLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        
        if(delay){
            
            circle.classList = `circle-animation${i}`
            $('#linea').addClass('line-animation')
        }

      
      circle.setAttribute("cx", i * interval + padding + 20);
      circle.setAttribute("cy", height - y - padding);
      circle.setAttribute("r", 5);
      circle.setAttribute("fill", "#FFFFFF");
      circle.setAttribute("stroke", "#854AF2");
      circle.setAttribute("stroke-width", "1.93px");
      document.getElementById("chart-svg").appendChild(circle);
      
      tick.setAttribute("x1", i * interval + padding + 20);
      tick.setAttribute("y1", 96 - 20);
      tick.setAttribute("x2", i * interval + padding + 20);
      tick.setAttribute("y2", 96 - 10);
      tick.setAttribute("stroke", "#999999");
      tick.setAttribute("stroke-width", "1.86px");
      
      document.getElementById("chart-svg").appendChild(tick);
      
      dashedLine.setAttribute("x1", 0);
      dashedLine.setAttribute("y1", i * lineInterval +11);
      dashedLine.setAttribute("x2", 255);
      dashedLine.setAttribute("y2", i * lineInterval +11);

      //the last line i draw must be a straight one, not dashed
      if(i != arr.length -1){
        dashedLine.setAttribute("stroke", "#122448");
        dashedLine.setAttribute("stroke-dasharray", "2");
        dashedLine.setAttribute("stroke-width", ".5px");
        dashedLine.setAttribute("opacity", ".5");
      }else{
        dashedLine.setAttribute("stroke", "#999999");
        dashedLine.setAttribute("stroke-width", "1.86px");
      }

      //add the x values
      let year = document.createElement('li')
      year.innerHTML = x
      document.querySelector('#dates').append(year)
      
      document.getElementById("chart-svg").appendChild(dashedLine);


      //im setting the tag p on top of the first and last dot, to show the value
      if(i === 0 || i === arr.length - 1){

        if(i === arr.length - 1 && delay === true){
            //the last tag comes with a delay
            setTimeout(()=>{
                let p = document.createElement('span')
                p.innerHTML = `$${originalValue}K`
                p.classList = 'p'
                p.style.top = `${height - y - 5 +50}px`
                p.style.left = `${i * interval + 12}px`
                $('.card').append(p)
            }, 1000)
        }else{
            let p = document.createElement('span')
            p.innerHTML = `$${originalValue}K`
            p.classList = 'p'
            p.style.top = `${height - y - 5 +50}px`
            p.style.left = `${i * interval + 12}px`
            $('.card').append(p)
        }

      }
      
      return [i * interval + padding + 20, height - y - padding];
    });


    $("#linea").attr("d", "M" + data.flat().join(" "));
  }
  
  //the first data is hard coded now, but it can be a get from another php
  const first_data = [
  ["NOW", 488],
  ["2023", 498],
  ["2024", 505],
  ["2025", 515],
  ["2026", 519],
  ["2027", 523],
]

drawGraphic(first_data)

$.get('data.php')
.done((new_data)=>{

    const arr = JSON.parse(new_data)
    
        //making the line and the dots fade out with a delay
        setTimeout(function(){
            $('#linea').fadeOut( 1500, function() {
                // Animation complete.
              });
            
            $('#chart-svg circle').fadeOut( 500, function() {
                // Animation complete.
            });
    
        }, 1000)
    
        //the prices need a longer delay
        setTimeout(function(){
            $('.p').fadeOut( "slow", function() {
                // Animation complete.
              });
        }, 2500)
    
    
        setTimeout(function() { 
    
            //removing old data
            $('#chart-svg circle').remove()
            $('.p').remove()
            $('#dates li').remove()
    
            //printing the new one with the animation needed
            setTimeout(function(){
                $('#linea').fadeIn( "slow");
                $('circle').fadeIn( "slow");
                $('.percentage_number').fadeOut("fast", function() {
                    $('.percentage_number').html('25.8')
                    $('.percentage_number').fadeIn("fast");
                })
            }, 1000)
            drawGraphic(arr, true)
        }, 4500);
})
