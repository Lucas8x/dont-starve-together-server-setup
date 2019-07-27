// Tabs
$('.tabButton').on('click', function(){
  $('.tab').hide(); // Hide all tab
  $('.tabButton').removeClass('active'); // Remove class active from all tabButton
  $('#'+$(this).attr('value')).show(); // Show respective clicked tab content
  $(this).addClass('active'); // Active clicked button
});

// Settings Tab

// Show playstyle selector when ready
$(document).ready(function (){
  $('#settings').show(); // Show settings content
  $('.tabButton').first().addClass('active') // Active settings button
});

$('.play_style_buttons, #play_style_str').on('click', function(){
  cluster_intention = $(this).attr('id')
  $('#play_style_str').html(cluster_intention)
  $('#choice_play_style').toggle() // Show and hide play style selection
  $('#after_play_style').toggle() // Show and hide settings options
});

// Show Play Style info when mouse over
$('.play_style_buttons')
  .mouseenter(function () {
    let type = $(this).attr('id');
    let info_playstyle = $('#info_playstyle');

    switch(type){
      case 'social':
        info_playstyle.html("This server is a place for friendly chatter, a<br/>relaxed playstyle, and getting to know people.<br/>Everyone's welcome here!");
        break;
      case 'cooperative':
        info_playstyle.html("Surviving's more fun when you do it as a team.<br/>On this server we want to work together and do<br/>our best to tame the hostile world");
        break;
      case 'competitive':
        info_playstyle.html("This server is the perfect arena for a fair fight.<br/>Everyone needs a place to prove who's the best<br/>at surviving, fighting, building, or... whatever.");
        break;
      case 'madness':
        info_playstyle.html("Anything goes on this server! Forest will be<br/>burned, food will be nommed, and backs will be<br/>unceremoniously stabbed. Be prepared!");
        break;
      }
  })
  .mouseleave(function () {
    $('#info_playstyle').html('')
  });

// Show steam group options
$('#server_visibility').change(function(){
  if($('input[value="steamgroup"]').is(":checked")){
    $('#steamgroupinfo').toggle();
  } else{
    $('#steamgroupinfo').toggle();
  }
});

// More Settings Button
$('#button_more_settings').on('click', function(){
  $('#more_settings').toggle();
});

// Caves Tab

$('#add_caves').on('click', function(){
  $('#addCavesMsg').toggle();
  $('#active_caves').toggle();
});

// Mods Tab

// Others

function load_server(){
};

function generate_server(){
};

const switchs = [
  ['false', 'true'],
  ['online', 'offline'],
  ['survival', 'endless', 'wilderness']
];

// Prev Next Arrows
$('.arrow-left').on('click', function(){
  current_tab = $('.tabButton.active').attr('value');
  switch(current_tab){
    case 'settings':
      let $span = $(this).closest('div').find('span[type="text"]');
      let status = $span.text().toLowerCase();
    
      check:
      for (let x = 0, length = switchs.length; x < length; x++){
        for (let y = 0, length = switchs[x].length; y < length; y++ ){
          if(switchs[x][y] === status){
            $span.text(switchs[x][y-1]);
            break check;
          }
        }
      }
      break;
    case 'forest':
      console.log("forest");
      break;
    case 'caves':
      console.log("caves");
      break;
    case 'mods':
      console.log("mods");
      break;
  }
});

$('.arrow-right').on('click', function(){
  let $span = $(this).closest('div').find('span[type="text"]');
  let status = $span.text().toLowerCase();

  check:
  for (let x = 0, length = switchs.length; x < length; x++){
    for (let y = 0, length = switchs[x].length; y < length; y++ ){
      if(switchs[x][y] === status){
        $span.text(switchs[x][y+1]);
        break check;
      }
    }
  }

});



/* Possible json */

const common_values = ['never', 'rare', 'default', 'often', 'always'];
const season_values = ['noseason', 'veryshortseason', 'shortseason', 'default', 'longseason', 'verylongseason', 'random'];
const speed_values = ['veryslow', 'slow', 'default', 'fast', 'veryfast'];


function isTheLastOne(){
};

function isTheFirstOne(){
};


var myjson = {
  'forestAllOptions': {
    // MISC
    'task_set': {
      'title': 'Task Set',
      'values': ['classic', 'default', 'cave_default'],
      'actual': 'default'
    },
    'start_location': {
      'title': 'Start Location',
      'values': ['caves', 'default', 'plus', 'darkness'],
      'actual': 'default'
    },
    'world_size': {
      'title': 'World Size',
      'values': ['small', 'medium', 'default', 'huge'],
      'actual': 'default'
    },
    'branching': {
      'title': 'Branching',
      'values': ['never', 'least', 'default', 'most'],
      'actual': 'default'
    },
    'specialevent': {
      'title': 'Special Event',
      'values': ['none', 'default', 'hallowed_nights', 'winters_feast', 'year_of_the_gobbler'],
      'actual': 'default'
    },
    'autumn': {
      'title': 'Autumn',
      'values': season_values,
      'actual': 'default'
    },
    'winter': {
      'title': 'Winter',
      'values': season_values,
      'actual': 'default'
    },
    'spring': {
      'title': 'Spring',
      'values': season_values,
      'actual': 'default'
    },
    'summer': {
      'title': 'Summer',
      'values': season_values,
      'actual': 'default'
    },
    'season_start': {
      'title': 'Season Start',
      'values': ['default', 'winter', 'spring', 'summer', 'autumnorspring', 'winterorsummer', 'random'],
      'actual': 'default'
    },
    'weather': {
      'title': 'Weather',
      'values': common_values,
      'actual': 'default'
    },
    'earthquakes': {
      'title': 'Earthquakes',
      'values': common_values,
      'actual': 'default'
    },
    'lightning': {
      'title': 'Lightning',
      'values': common_values,
      'actual': 'default'
    },
    'frograin': {
      'title': 'Frograin',
      'values': common_values,
      'actual': 'default'
    },
    'wildfires': {
      'title': 'Wildfires',
      'values': common_values,
      'actual': 'default'
    },
    'regrowth': {
      'title': 'Regrowth',
      'values': speed_values,
      'actual': 'default'
    },
    'touchstone': {
      'title': 'Touch Stone',
      'values': common_values,
      'actual': 'default'
    },
    'boons': {
      'title': 'Boons',
      'values': common_values,
      'actual': 'default'
    },
    'cavelight': {
      'title': 'Cave Light',
      'values': speed_values,
      'actual': 'default'
    },
    'disease_delay': {
      'title': 'Disease Delay',
      'values': ['none', 'random', 'long', 'default', 'short'],
      'actual': 'default'
    },
    'prefabswaps_start': {
      'title': 'Prefabswaps Start',
      'values': ['classic', 'default', 'highly random'],
      'actual': 'default'
    },
    'petrification': {
      'title': 'Petrification',
      'values': ['none', 'few', 'default', 'many', 'max'],
      'actual': 'default'
    },

    // Resources
    'flowers': {
      'title': 'Flowers',
      'values': common_values,
      'actual': 'default'
    },
    'grass': {
      'title': 'Grass',
      'values': common_values,
      'actual': 'default'
    },
    'sapling': {
      'title': 'Sapling',
      'values': common_values,
      'actual': 'default'
    },
    'marshbush': {
      'title': 'Marshbush',
      'values': common_values,
      'actual': 'default'
    },
    'tumbleweed': {
      'title': 'Tumbleweed',
      'values': common_values,
      'actual': 'default'
    },
    'reeds': {
      'title': 'Reeds',
      'values': common_values,
      'actual': 'default'
    },
    'trees': {
      'title': 'Trees',
      'values': common_values,
      'actual': 'default'
    },
    'flint': {
      'title': 'Flint',
      'values': common_values,
      'actual': 'default'
    },
    'rock': {
      'title': 'Rock',
      'values': common_values,
      'actual': 'default'
    },
    'rock_ice': {
      'title': 'Rock ice',
      'values': common_values,
      'actual': 'default'
    },
    'meteorspawner': {
      'title': 'Meteor Spawner',
      'values': common_values,
      'actual': 'default'
    },
    'meteorshowers': {
      'title': 'Meteor Showers',
      'values': common_values,
      'actual': 'default'
    },
    'mushtree': {
      'title': 'Mushtree',
      'values': common_values,
      'actual': 'default'
    },
    'fern': {
      'title': 'Fern',
      'values': common_values,
      'actual': 'default'
    },
    'flower_cave': {
      'title': 'Flower Cave',
      'values': common_values,
      'actual': 'default'
    },
    'wormlights': {
      'title': 'Wormlights',
      'values': common_values,
      'actual': 'default'
    },

    // UNPREPARED
    'berrybush': {
      'title': 'Berrybush',
      'values': common_values,
      'actual': 'default'
    },
    'carrot': {
      'title': 'Carrot',
      'values': common_values,
      'actual': 'default'
    },
    'mushroom': {
      'title': 'Mushroom',
      'values': common_values,
      'actual': 'default'
    },
    'cactus': {
      'title': 'Cactus',
      'values': common_values,
      'actual': 'default'
    },
    'banana': {
      'title': 'Banana',
      'values': common_values,
      'actual': 'default'
    },
    'lichen': {
      'title': 'Lichen',
      'values': common_values,
      'actual': 'default'
    },

    // ANIMALS
    'rabbits': {
      'title': 'Rabbits',
      'values': common_values,
      'actual': 'default'
    },
    'moles': {
      'title': 'Moles',
      'values': common_values,
      'actual': 'default'
    },
    'butterfly': {
      'title': 'Butterfly',
      'values': common_values,
      'actual': 'default'
    },
    'birds': {
      'title': 'Birds',
      'values': common_values,
      'actual': 'default'
    },
    'buzzard': {
      'title': 'Buzzard',
      'values': common_values,
      'actual': 'default'
    },
    'catcoon': {
      'title': 'Catcoon',
      'values': common_values,
      'actual': 'default'
    },
    'perd': {
      'title': 'Perd',
      'values': common_values,
      'actual': 'default'
    },
    'pigs': {
      'title': 'Pigs',
      'values': common_values,
      'actual': 'default'
    },
    'lightninggoat': {
      'title': 'Lightninggoat',
      'values': common_values,
      'actual': 'default'
    },
    'beefalo': {
      'title': 'Beefalo',
      'values': common_values,
      'actual': 'default'
    },
    'beefaloheat': {
      'title': 'Beefaloheat',
      'values': common_values,
      'actual': 'default'
    },
    'hunt': {
      'title': 'Hunt',
      'values': common_values,
      'actual': 'default'
    },
    'alternatehunt': {
      'title': 'Alternatehunt',
      'values': common_values,
      'actual': 'default'
    },
    'penguins': {
      'title': 'Penguins',
      'values': common_values,
      'actual': 'default'
    },
    'cave_ponds': {
      'title': 'Cave_ponds',
      'values': common_values,
      'actual': 'default'
    },
    'ponds': {
      'title': 'Ponds',
      'values': common_values,
      'actual': 'default'
    },
    'bees': {
      'title': 'Bees',
      'values': common_values,
      'actual': 'default'
    },
    'angrybees': {
      'title': 'Angrybees',
      'values': common_values,
      'actual': 'default'
    },
    'tallbirds': {
      'title': 'Tallbirds',
      'values': common_values,
      'actual': 'default'
    },
    'slurper': {
      'title': 'Slurper',
      'values': common_values,
      'actual': 'default'
    },
    'bunnymen': {
      'title': 'Bunnymen',
      'values': common_values,
      'actual': 'default'
    },
    'slurtles': {
      'title': 'Slurtles',
      'values': common_values,
      'actual': 'default'
    },
    'rocky': {
      'title': 'Rocky',
      'values': common_values,
      'actual': 'default'
    },
    'monkey': {
      'title': 'Monkey',
      'values': common_values,
      'actual': 'default'
    },

    //MONSTERS
    'spiders': {
      'title': 'Spiders',
      'values': common_values,
      'actual': 'default'
    },
    'cave_spiders': {
      'title': 'Cave Spiders',
      'values': common_values,
      'actual': 'default'
    },
    'hounds': {
      'title': 'Hounds',
      'values': common_values,
      'actual': 'default'
    },
    'houndmound': {
      'title': 'Houndmound',
      'values': common_values,
      'actual': 'default'
    },
    'merm': {
      'title': 'Merm',
      'values': common_values,
      'actual': 'default'
    },
    'tentacles': {
      'title': 'Tentacles',
      'values': common_values,
      'actual': 'default'
    },
    'chess': {
      'title': 'Chess',
      'values': common_values,
      'actual': 'default'
    },
    'lureplants': {
      'title': 'Lureplants',
      'values': common_values,
      'actual': 'default'
    },
    'walrus': {
      'title': 'Walrus',
      'values': common_values,
      'actual': 'default'
    },
    'liefs': {
      'title': 'Liefs',
      'values': common_values,
      'actual': 'default'
    },
    'deciduousmonster': {
      'title': 'Deciduousmonster',
      'values': common_values,
      'actual': 'default'
    },
    'krampus': {
      'title': 'Krampus',
      'values': common_values,
      'actual': 'default'
    },
    'bearger': {
      'title': 'Bearger',
      'values': common_values,
      'actual': 'default'
    },
    'deerclops': {
      'title': 'Deerclops',
      'values': common_values,
      'actual': 'default'
    },
    'goosemoose': {
      'title': 'Goosemoose',
      'values': common_values,
      'actual': 'default'
    },
    'dragonfly': {
      'title': 'Dragonfly',
      'values': common_values,
      'actual': 'default'
    },
    'antliontribute': {
      'title': 'Antliontribute',
      'values': common_values,
      'actual': 'default'
    },
    'bats': {
      'title': 'Bats',
      'values': common_values,
      'actual': 'default'
    },
    'fissure': {
      'title': 'Fissure',
      'values': common_values,
      'actual': 'default'
    },
    'wormattacks': {
      'title': 'Wormattacks',
      'values': common_values,
      'actual': 'default'
    },
    'worms': {
      'title': 'Worms',
      'values': common_values,
      'actual': 'default'
    }
  },

  'cavesAllOptions': {
  }

};

var toAdd = [];

for(let item in myjson['forestAllOptions']){
  toAdd += `
    <div class="mini_option_background">
      <button class="arrow-left"></button>
      <button class="arrow-right"></button>
      <img src="assets/icons/tempFrame.jpg">
      <span type="text">${myjson['forestAllOptions'][item]['title']}</span>
      <span type="text" name="${myjson['forestAllOptions'][item]['actual']}">Default</span>
    </div><br>
    `;
}

document.getElementById("forestSettings").innerHTML = toAdd;