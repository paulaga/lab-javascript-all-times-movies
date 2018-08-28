/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes 
const turnHoursToMinutes = arr => { 
  return arr.map( e => {
    let durArr = e.duration.split(" ");
    if (durArr.length > 1) {
      return { duration: parseInt(durArr[0].slice(0,1) * 60) + parseInt(durArr[1].replace(/min/g,""))}
    } 
    else if (durArr.length == 1 && e.duration.includes("h")) {
      return { duration: parseInt(durArr[0].slice(0,1) * 60) }
    }
    else {
      return { duration: parseInt(e.duration.replace(/min/g,"")) }
    }
  });
};

// Get the average of all rates with 2 decimals
const ratesAverage  = arr => {
  let total = arr.reduce((acc, num) => {
    if(!num.rate) return acc;  
    return acc + parseInt(num.rate) / arr.length;
  }, 0);
  return Math.round(total * 100)/100;
};

// Get the average of Drama Movies
const dramaMoviesRate = arr => {
  let drama = arr.filter( e => {
    return e.genre.includes('Drama')
  })
  if (!drama.length) return;
  let averageDrama = ratesAverage(drama).toFixed(2);
  return parseFloat(averageDrama);
};

// Order by time duration, in growing order
const orderByDuration = arr => {
  return arr.sort((a,b) => {
    if(a.duration === b.duration) {
      if(a.title > b.title) {
        return 1;
      } else if(a.title < b.title) {
        return -1;
      }
      return 0;
    }
    return a.duration - b.duration;
  });
}

// How many movies did STEVEN SPIELBERG
const howManyMovies = arr => {
  if (arr.length === 0) return;
  let drama = arr.filter( e => {
    return e.genre.includes('Drama');
  })
  let steven = drama.filter( s => {
    return s.director.includes('Spielberg')
  })
  return `Steven Spielberg directed ${steven.length} drama movies!`;
}

// Order by title and print the first 20 titles
const orderAlphabetically = arr => {
  let tit = []
  let sortArr = arr.sort((a,b) => {
    if(a.title > b.title) {
      return 1;
    } else if(a.title < b.title) {
      return -1;
    }
    return 0;
  });
  let limit = 20;
  if(sortArr.length < 20) {
    limit = sortArr.length;
  }
  for(let i = 0; i < limit; i++){
    tit.push(sortArr[i].title) 
  }
  return tit;
}

// Best yearly rate average
const bestYearAvg = arr => {
  let best = 0;
  let years = '';
  let bestAvg = [];
  if(!arr.length) return;
  arr.forEach( e => {
    let rating = +e.rate
    if(rating > best) {
      best = rating;
      years = e.year;
    } else if(rating === best) {
      if(e.year < years) {
        years = e.year;
      }
    }
  })
  arr.forEach( y => {
    if(y.year === years) {
      bestAvg.push(+y.rate);
      bestAvg.reduce((acc, tot) => { 
        best = acc + tot / bestAvg.length; 
        return best;
      }, 0);
    }
  })
  return `The best year was ${years} with an average rate of ${best}`;
}