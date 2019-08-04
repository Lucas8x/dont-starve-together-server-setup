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

const common_values = ['never', 'rare', 'default', 'often', 'always'];
const season_values = ['noseason', 'veryshortseason', 'shortseason', 'default', 'longseason', 'verylongseason', 'random'];
const speed_values = ['veryslow', 'slow', 'default', 'fast', 'veryfast'];

const all_game_settings = {
  'forest' : {
    'Forest World' : { // MISC
      'biomes' : {
        'title': 'Biomes',
        'values': ['together', 'classic']
      },
      'start_location' : {
        'title': 'World Gen: Spawn Area',
        'values': ['caves', 'default', 'plus', 'darkness']
      },
      'world_size' : {
        'title': 'World Gen: Size',
        'values': ['small', 'medium', 'default', 'huge']
      },
      'branching' : {
        'title': 'World Gen: Branches',
        'values': ['never', 'least', 'default', 'most']
      },
      'loop': {
        'title': 'World Gen: Loops',
        'values' : ['never', 'default', 'always']
      },
      'specialevent': {
        'title': 'Special Event',
        'values': ['none', 'default', 'hallowed_nights', 'winters_feast', 'year_of_the_gobbler']
      },
      'autumn': {
        'title': 'Autumn',
        'values': season_values
      },
      'winter': {
        'title': 'Winter',
        'values': season_values
      },
      'spring': {
        'title': 'Spring',
        'values': season_values
      },
      'summer': {
        'title': 'Summer',
        'values': season_values
      },
      'season_start': {
        'title': 'Season Start',
        'values': ['default', 'winter', 'spring', 'summer', 'autumnorspring', 'winterorsummer', 'random']
      },
      'weather': {
        'title': 'Weather',
        'values': common_values
      },
      'lightning': {
        'title': 'Lightning',
        'values': common_values
      },
      'frograin': {
        'title': 'Frograin',
        'values': common_values
      },
      'wildfires': {
        'title': 'Wildfires',
        'values': common_values
      },
      'regrowth': {
        'title': 'Regrowth',
        'values': speed_values
      },
      'touchstone': {
        'title': 'Touch Stone',
        'values': common_values
      },
      'boons': {
        'title': 'Boons',
        'values': common_values
      },
      'disease_delay': {
        'title': 'Disease Delay',
        'values': ['none', 'random', 'long', 'default', 'short']
      },
      'prefabswaps_start': {
        'title': 'Prefabswaps Start',
        'values': ['classic', 'default', 'highly random']
      },
      'petrification': {
        'title': 'Petrification',
        'values': ['none', 'few', 'default', 'many', 'max']
      },
    },
    'Forest Resources' : { // RESOURCES
      'flowers': 'Flowers, Evil Flowers',
      'grass': 'Grass',
      'sapling': 'Sapling',
      'marshbush': 'Marshbush',
      'tumbleweed': 'Tumbleweed',
      'reeds':'Reeds',
      'trees': 'Trees',
      'flint': 'Flint',
      'rock': 'Rock',
      'rock_ice': 'Rock ice',
      'meteorspawner': 'Meteor Spawner',
      'meteorshowers': 'Meteor Showers'
    },
    'Forest Food' : { // UNPREPARED
      'berrybush': 'Berrybush',
      'carrot': 'Carrot',
      'mushroom': 'Mushroom',
      'cactus': 'Cactus'
    },
    'Forest Animals' : { // ANIMALS
      'rabbits': 'Rabbits',
      'moles': 'Moles',
      'butterfly': 'Butterfly',
      'birds': 'Birds',
      'buzzard': 'Buzzard',
      'catcoon': 'Catcoon',
      'perd': 'Perd',
      'pigs': 'Pigs',
      'lightninggoat': 'Lightnin Goat',
      'beefalo': 'Beefalo',
      'beefaloheat': 'Beefaloheat',
      'hunt': 'Hunts',
      'alternatehunt': 'Hunt Surprises',
      'penguins': 'Penguins',
      'ponds': 'Ponds',
      'bees': 'Bees',
      'angrybees': 'Angrybees',
      'tallbirds': 'Tallbirds',
      'bunnymen': 'Bunnymen'
    },
    'Forest Monsters' : { //MONSTERS
      'spiders': 'Spiders',
      'hounds': 'Hound Attack',
      'houndmound': 'Houndmound',
      'merm': 'Merms',
      'tentacles': 'Tentacles',
      'chess': 'Chess',
      'lureplants': 'Lureplants',
      'walrus': 'Walrus',
      'liefs': 'Liefs',
      'deciduousmonster': 'Deciduousmonster',
      'krampus': 'Krampii',
      'bearger': 'Bearger',
      'deerclops': 'Deerclops',
      'goosemoose': 'Goosemoose',
      'dragonfly': 'Dragonfly',
      'antliontribute': 'Antlion Tribute'
    }
  },
  'caves' : {
    'Cave World' : {
      'biomes' : {
        'title' : 'Biomes',
        'values' : ['underground']
      },
      'start_location' : {
        'title' : 'World Gen: Spawn Area',
        'values' : ['caves']
      },
      'world_size' : {
        'title' : 'World Gen: Size',
        'values' : ['small', 'medium', 'default', 'huge']
      },
      'branching' : {
        'title' : 'World Gen: Branches',
        'values' : ['never', 'least', 'default', 'most']
      },
      'loop': {
        'title' : 'World Gen: Loops',
        'values' : ['never', 'default', 'always']
      }
    },
    'Cave Resources' : {
      'grass' : 'Grass',
      'sapling' : 'Sapling',
      'marshbush' : 'Spiky Bush',
      'reeds' :'Reeds',
      'trees' : 'Trees (All)',
      'flint' : 'Flint',
      'rock' : 'Rock',
      'rock_ice' : 'Rock ice',
      'mushtree' : 'Mushtree',
      'fern' : 'Cave Ferns',
      'flower_cave' : 'Light Flowers',
      'wormlight' : 'Glow Berries'
    },
    'Cave Food' : {
      'berrybush': 'Berrybush',
      'mushroom': 'Mushroom',
      'banana' : 'Cave Bananas',
      'lichen' : 'Lichen'
    },
    'Cave Animals' : {
      'cave_ponds' : 'Ponds',
      'slurper' : 'Slurpers',
      'bunnymen' : 'Bunnymen',
      'slurtles' : 'Slurtles and Snurtles',
      'rocky' : 'Rocky',
      'monkey' : 'Monkeys'
    },
    'Cave Monsters' : {
      'spiders' : 'Spiders',
      'tentacles' : 'Tentacles',
      'chess' : 'Clockworks',
      'liefs' : 'Treeguards',
      'bats' : 'Bats',
      'fissure' : 'Nightmare Fissures',
      'wormattacks' : 'Cave Worm Attacks',
      'worms' : 'Cave Worms'
    }
  }
};

var big_data = [];

class worldSettingeItem {
  constructor(game_id, title, possible_values, actual_value, world, category){
    this.game_id = game_id;
    this.title = title;
    this.possible_values = possible_values;
    this.actual_value = actual_value;
    this.world = world;
    this.category = category;
  };

  changeActual(new_value){
    if(this.possible_values.includes(new_value)){
      this.actual_value = new_value;
    }
  };
}

// Create settings item object
for(let world in all_game_settings){ // world = forest or caves
  for(let category in all_game_settings[world]){ // MISC, RESOURCES, UNPREPARED, ANIMALS, MONSTERS
    for(let item in all_game_settings[world][category]){ // settting item
      if(['Forest World', 'Cave World'].includes(category)){
        big_data.push(new worldSettingeItem(item, all_game_settings[world][category][item]['title'], all_game_settings[world][category][item]['values'], 'default', world, category));
      } else {
        big_data.push(new worldSettingeItem(item, all_game_settings[world][category][item], common_values, 'default', world, category));
      }
    }
  }
};

// HTML items
var forest_html = [];
var caves_html = [];

function buildHtmlItem(game_id, title, actual_value){
  return `<div class="mini_option_background">
  <button class="arrow-left"></button>
  <button class="arrow-right"></button>
  <img src="assets/icons/${game_id}.jpg">
  <span type="text">${title}</span>
  <span type="text" name="${actual_value}">${actual_value}</span>
  </div><br>`
};

// Add settings items to html
for(let world in all_game_settings){
  switch(world){
    case 'forest':
      for(let category in all_game_settings[world]){
        forest_html += `<div class="option_background">${category}</div>`
        for(let obj in big_data){
          if(big_data[obj].category === category && big_data[obj].world === world){
            forest_html += buildHtmlItem(big_data[obj].game_id,big_data[obj].title, big_data[obj].actual_value);
          }
        }
      }
      break;
    case 'caves':
      for(let category in all_game_settings[world]){
        caves_html += `<div class="option_background">${category}</div>`
        for(let obj in big_data){
          if(big_data[obj].category === category && big_data[obj].world === world){
            caves_html += buildHtmlItem(big_data[obj].game_id, big_data[obj].title, big_data[obj].actual_value);
          }
        }
      }
      break;
  }
};

document.getElementById("forestSettings").innerHTML = forest_html;
document.getElementById("cavesSettings").innerHTML = caves_html;

