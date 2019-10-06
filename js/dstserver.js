$(document).ready(function () {

  var zip = new JSZip();

  // Tabs
  $('.tabButton').on('click', function() {
    $('.tab').hide(); // Hide all tab
    $('.tabButton').removeClass('active'); // Remove class active from all tabButton
    $('#'+$(this).attr('value')).show(); // Show respective clicked tab content
    $(this).addClass('active'); // Active clicked button
  });

  // Settings Tab
  // Show playstyle selector
  $('#settings').show(); // Show settings content
  $('.tabButton').first().addClass('active') // Active settings button

  $('.play_style_buttons, #play_style_str').on('click', function() {
    cluster_intention = $(this).attr('id')
    $('#play_style_str').html(cluster_intention)
    $('#choice_play_style').toggle() // Show and hide play style selection
    $('#after_play_style').toggle() // Show and hide settings options
    $('#manage').toggle() // Show and hide bottom buttons
  });

  // Show Play Style info when mouse over
  $('.play_style_buttons')
    .mouseenter(function () {
      let type = $(this).attr('id');
      let info_playstyle = $('#info_playstyle');

      if(type == 'social')
        info_playstyle.html("This server is a place for friendly chatter, a<br/>relaxed playstyle, and getting to know people.<br/>Everyone's welcome here!");
      else if(type == 'cooperative')
        info_playstyle.html("Surviving's more fun when you do it as a team.<br/>On this server we want to work together and do<br/>our best to tame the hostile world");
      else if(type == 'competitive')
        info_playstyle.html("This server is the perfect arena for a fair fight.<br/>Everyone needs a place to prove who's the best<br/>at surviving, fighting, building, or... whatever.");
      else if(type == 'madness')
        info_playstyle.html("Anything goes on this server! Forest will be<br/>burned, food will be nommed, and backs will be<br/>unceremoniously stabbed. Be prepared!");
    })
    .mouseleave(function () {
      $('#info_playstyle').html('')
    });

  // Show steam group settings
  $('#server_visibility').change(function() {
    if($('input[value="steamgroup"]').is(":checked"))
      $('#steamgroupinfo').toggle();
    else
      $('#steamgroupinfo').hide();
  });

  // More Settings Button
  $('#button_more_settings').on('click', function() {
    $('#more_settings').toggle();
  });

  // Caves Tab
  $('#add_caves').on('click', function() {
    $('#addCavesMsg').toggle();
    $('#active_caves').toggle();
  });

  // Mods Tab

  // Others
  checkSteamGroup = () => $('input[value="steamgroup"]').is(":checked") ? true : false;
  
  checkIfCavesEnabled = () => $('#active_caves').css('display') == 'block' ? true : false;

  $('#loadServer').on('click', function() {
    console.log("loading server");
  });

  $('#generateServer').on('click', function() {
    let cluster_ini = (`
      [GAMEPLAY]
      game_mode = ${$("span[name=game_mode]").text().toLowerCase()}
      max_players = ${$("input[name=max_players]").val()}
      pvp = ${$("span[name=pvp]").text().toLowerCase()}
      pause_when_empty = ${$("span[name=pause_when_empty]").text().toLowerCase()}

      [NETWORK]
      cluster_name = ${$("input[name=cluster_name]").val()}
      cluster_description = ${$("input[name=cluster_description]").val()}
      cluster_password = ${$("input[name=password]").val()}
      cluster_intention = ${cluster_intention}
      lan_only_cluster = ${$("span[name=lan_only_cluster]").text().toLowerCase()}
      offline_cluster = ${$("span[name=offline_cluster]").text().toLowerCase()}
      cluster_language = ${$("input[name=cluster_language]").val()}
      whitelist_slots = ${$("input[name=whitelist_slots]").val()}
      autosaver_enabled = ${$("span[name=autosaver_enabled]").text().toLowerCase()}
      enable_vote_kick = ${$("span[name=enable_vote_kick]").text().toLowerCase()}
      tick_rate = ${$("input[name=tick_rate]").val()}

      [MISC]
      console_enabled = ${$("span[name=console_enabled]").text().toLowerCase()}
      max_snapshots = ${$("input[name=max_snapshots]").val()}

      [STEAM]
      steam_group_only = ${checkSteamGroup()}
      steam_group_id = ${$("input[name=steam_group_id]").val()}
      steam_group_admins = ${$("span[name=steam_group_admins]").text().toLowerCase()}

      [SHARD]
      shard_enabled = ${checkIfCavesEnabled()}
      bind_ip = 127.0.0.1
      master_ip = 127.0.0.1
      master_port = 10888
      cluster_key = defaultPass`);

    let mater_server_ini = (`
      [NETWORK]
      server_port = 10999
      
      [SHARD]
      is_master = true
      
      [ACCOUNT]
      encode_user_path = true`);

    let caves_server_ini = (`
      [NETWORK]
      server_port = 10998
      
      [SHARD]
      is_master = false
      name = Caves
      
      [ACCOUNT]
      encode_user_path = true
      
      [STEAM]
      master_server_port = 27017
      authentication_port = 8767`);

    let cluster_token = $("input[name=cluster_token]").val();
    
    let master_leveldataoverride = "";
    let caves_leveldataoverride = "";

    for(let item in world_settings_object_list) {
      if(world_settings_object_list[item].world == 'forest') {
        master_leveldataoverride += `${world_settings_object_list[item].returnString()},\n`
      } else if(world_settings_object_list[item].world == 'caves') {
        caves_leveldataoverride += `${world_settings_object_list[item].returnString()},\n`
      }
    };
    
    //let run_server = ``;

    zip.file("cluster.ini", cluster_ini);
    zip.file("cluster_token.txt", cluster_token);
    zip.file("run_server.bat", run_server);
    
    // Master Folder
    let Master = zip.folder("Master");
    Master.file("leveldataoverride.lua", `return {\n${master_leveldataoverride}}`);
    Master.file("server.ini", mater_server_ini);
    Master.file("modoverrides.lua");

    // Caves Folder
    let Caves = zip.folder("Caves");
    Caves.file("leveldataoverride.lua", `return {\n${caves_leveldataoverride}}`);
    Caves.file("server.ini", caves_server_ini);
    Caves.file("modoverrides.lua");

    zip.generateAsync({type: "blob"})
      .then(function(content) {
        saveAs(content, "dst-server.zip");
      });
  });

  const switchs = [
    ['false', 'true'],
    ['online', 'offline'],
    ['survival', 'endless', 'wilderness']
  ];

  get_from_world_settings_object_list = (id, world) => {
    return world_settings_object_list.filter(setting => setting.game_id === id && setting.world === world)[0];
  };

  // Left/Previous Arrow
  $(function() {
    $('.arrow-left').click(function(){
      let current_tab = $('.tabButton.active').attr('value');
      if(current_tab === 'settings') {
        let clicked_div = $(this).closest('div').attr('id');
        if(clicked_div === 'game_mode') {
          let $span = $(this).closest('div').find('span[type="text"]');
          let actual_status = $span.text().toLowerCase();
          if(switchs[2].indexOf(actual_status) > 0 ) {
            let new_status = switchs[2][switchs[2].indexOf(actual_status)-1];
            $span.text(new_status);
          }
        } else if(clicked_div === 'server_mode') {
          let $span = $(this).closest('div').find('span[type="text"]');
          let actual_status = $span.text().toLowerCase();
          if(switchs[1].indexOf(actual_status) > 0 ) {
            let new_status = switchs[1][switchs[1].indexOf(actual_status)-1];
            $span.text(new_status);
          }
        } else if(clicked_div === 'cluster_language') {
          // a
        } else if(['pvp', 'console', 'offline_cluster', 'lan_only', 'autosaver_enabled', 'pause_when_empty', 'vote_enabled'].includes(clicked_div)) {
          let $span = $(this).closest('div').find('span[type="text"]');
          let actual_status = $span.text().toLowerCase();
          if(actual_status === 'true')
            $span.text('false');
          else
            $span.text('true');
        } else {
          let $input = $(this).closest('div').find('input');
          let actual_value = parseInt($input.val());
          $input.val(actual_value-1);
          }
        }
        else if(current_tab === 'forest') {
          let $span = $(this).parent().find('span[name]');
          let id = $span.attr('name');
          let new_value = get_from_world_settings_object_list(id, 'forest').previous();
          $span.text(new_value);
        }
        else if(current_tab === 'caves') {
          let $span = $(this).parent().find('span[name]');
          let id = $span.attr('name');
          let new_value = get_from_world_settings_object_list(id, 'caves').previous();
          $span.text(new_value);
        }
        else if(current_tab === 'mods') {
          console.log("mods");
        }
    });
  });
  // Right/Next Arrow
  $(function() {
    $('.arrow-right').click(function() {
      let current_tab = $('.tabButton.active').attr('value');
      if(current_tab === 'settings') {
        let clicked_div = $(this).closest('div').attr('id');
        if(clicked_div === 'game_mode') {
          let $span = $(this).closest('div').find('span[type="text"]');
          let actual_status = $span.text().toLowerCase();
          if(switchs[2].indexOf(actual_status) < switchs[2].length-1 ) {
            let new_status = switchs[2][switchs[2].indexOf(actual_status)+1];
            $span.text(new_status);
          }
        } else if(clicked_div === 'server_mode') {
          let $span = $(this).closest('div').find('span[type="text"]');
          let actual_status = $span.text().toLowerCase();
          if(switchs[1].indexOf(actual_status) < switchs[1].length-1 ) {
            let new_status = switchs[1][switchs[1].indexOf(actual_status)+1];
            $span.text(new_status);
          }
        } else if(clicked_div === 'cluster_language') {
            // a
        } else if(['pvp', 'console', 'offline_cluster', 'lan_only', 'autosaver_enabled', 'pause_when_empty', 'vote_enabled'].includes(clicked_div)) {
          let $span = $(this).closest('div').find('span[type="text"]');
          let actual_status = $span.text().toLowerCase();
          if(actual_status === 'true')
            $span.text('false');
          else
            $span.text('true');
        } else {
            let $input = $(this).closest('div').find('input');
            let actual_value = parseInt($input.val());
            $input.val(actual_value+1);
          }
      } else if(current_tab === 'forest') {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = get_from_world_settings_object_list(id, 'forest').next();
        $span.text(new_value);
      } else if(current_tab === 'caves') {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = get_from_world_settings_object_list(id, 'caves').next();
        $span.text(new_value);
      } else if(current_tab === 'mods') {
        console.log("mods");
      }
    });
  });

  const common_values = ['never', 'rare', 'default', 'often', 'always'];
  const season_values = ['noseason', 'veryshortseason', 'shortseason', 'default', 'longseason', 'verylongseason', 'random'];
  const speed_values = ['veryslow', 'slow', 'default', 'fast', 'veryfast'];

  const world_game_settings = {
    'forest' : {
      'Forest World' : { // MISC
        'biomes' : {
          'title': 'Biomes',
          'values': ['together', 'classic']
        },
        'start_location' : {
          'title': 'World Gen: Spawn Area',
          'values': ['plus', 'darkness', 'default']
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
          'title': 'Starting Season',
          'values': ['default', 'winter', 'spring', 'summer', 'autumnorspring', 'winterorsummer', 'random']
        },
        'day': {
          'title': 'Day Type',
          'values': ['default', 'longday', 'longdusk', 'longnight', 'noday', 'nodusk', 'nonight', 'onlyday', 'onlydusk', 'onlynight']
        },
        'weather': {
          'title': 'Rain',
          'values': common_values
        },
        'lightning': {
          'title': 'Lightning',
          'values': common_values
        },
        'frograin': {
          'title': 'Frog Rain',
          'values': common_values
        },
        'wildfires': {
          'title': 'Wildfires',
          'values': common_values
        },
        'regrowth': {
          'title': 'World Regrowth',
          'values': speed_values
        },
        'touchstone': {
          'title': 'Touch Stone',
          'values': common_values
        },
        'boons': {
          'title': 'Failed Survivors',
          'values': common_values
        },
        'disease_delay': {
          'title': 'Disease',
          'values': ['none', 'random', 'long', 'default', 'short']
        },
        'prefabswaps_start': {
          'title': 'Starting Resource Variety',
          'values': ['classic', 'default', 'highly random']
        },
        'petrification': {
          'title': 'Forest Petrification',
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
        },
        'weather': {
          'title' : 'Rain',
          'values': []
        },
        'earthquake' : {
          'title' : 'Earthquakes',
          'values' : ['never', 'rare', 'default', 'often', 'always']
        },
        'regrowth': {
          'title': 'World Regrowth',
          'values': speed_values
        },
        'touchstone': {
          'title': 'Touch Stone',
          'values': common_values
        },
        'boons': {
          'title': 'Failed Survivors',
          'values': common_values
        },
        'cavelight': {
          'title': 'Sinkhole Lights',
          'values': []
        },
        'disease_delay': {
          'title': 'Disease',
          'values': ['none', 'random', 'long', 'default', 'short']
        },
        'prefabswaps_start': {
          'title': 'Starting Resource Variety',
          'values': ['classic', 'default', 'highly random']
        },
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

  var world_settings_object_list = [];

  class worldSettingeItem {
    constructor(game_id, title, possible_values, actual_value, world, category){
      this.game_id = game_id;
      this.title = title;
      this.possible_values = possible_values;
      this.actual_value = actual_value;
      this.world = world;
      this.category = category;
    };

    changeActual(new_value) {
      if(this.possible_values.includes(new_value)) {
        this.actual_value = new_value;
      }
    };

    previous() {
      if(this.possible_values.indexOf(this.actual_value) > 0) {
        let new_value = this.possible_values[this.possible_values.indexOf(this.actual_value)-1];
        this.changeActual(new_value);
        return new_value;
      }
    };

    next() {
      if(this.possible_values.indexOf(this.actual_value) < this.possible_values.length-1) {
        let new_value = this.possible_values[this.possible_values.indexOf(this.actual_value)+1];
        this.changeActual(new_value);
        return new_value;
      }
    };

    returnString() {
      return `${this.game_id} = "${this.actual_value}"`;
    };
  };

  // Create settings item object
  for(let world in world_game_settings) { // world = forest or caves
    for(let category in world_game_settings[world]) { // MISC, RESOURCES, UNPREPARED, ANIMALS, MONSTERS
      for(let item in world_game_settings[world][category]) { // settting item
        if(['Forest World', 'Cave World'].includes(category)) {
          world_settings_object_list.push(new worldSettingeItem(item, world_game_settings[world][category][item]['title'], world_game_settings[world][category][item]['values'], 'default', world, category));
        } else {
          world_settings_object_list.push(new worldSettingeItem(item, world_game_settings[world][category][item], common_values, 'default', world, category));
        }
      }
    }
  };

  // HTML items
  var forest_html = [];
  var caves_html = [];

  buildHtmlItem = (game_id, title, actual_value) => {
    return (
      `<li>
        <img src="./assets/icons/${game_id}.jpg">
        <footer>
          <button class="arrow-left"></button>
          <button class="arrow-right"></button>
          <span type="text">${title}</span><br>
          <span type="text" name="${game_id}">${actual_value}</span>
        </footer>
      </li>`
    );
  };

  // Add settings itens to html
  for(let world in world_game_settings) {
    if(world == 'forest'){
      for(let category in world_game_settings[world]) {
        forest_html += `<div class="option_background">${category}</div><ul>`
        for(let obj in world_settings_object_list) {
          if(world_settings_object_list[obj].category === category && world_settings_object_list[obj].world === world) {
            forest_html += buildHtmlItem(world_settings_object_list[obj].game_id,world_settings_object_list[obj].title, world_settings_object_list[obj].actual_value);
          }
        }
        forest_html += '</ul>';
      }
    } else if(world == 'caves') {
      for(let category in world_game_settings[world]) {
        caves_html += `<div class="option_background">${category}</div><ul>`
        for(let obj in world_settings_object_list) {
          if(world_settings_object_list[obj].category === category && world_settings_object_list[obj].world === world) {
            caves_html += buildHtmlItem(world_settings_object_list[obj].game_id, world_settings_object_list[obj].title, world_settings_object_list[obj].actual_value);
          }
        }
        caves_html += '</ul>';
      }
    }
  }

  document.getElementById("forestSettings").innerHTML = forest_html;
  document.getElementById("cavesSettings").innerHTML = caves_html;

});