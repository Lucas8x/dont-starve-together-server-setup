$(document).ready(function () {

  var zip = new JSZip();

  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

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
    cluster_intention = $(this).attr('id');
    $('#play_style_str').html(cluster_intention.capitalize());
    $('#choice_play_style').toggle(); // Show and hide play style selection
    $('#after_play_style').toggle(); // Show and hide settings options
    $('#manage').toggle(); // Show and hide bottom buttons
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
      $('#info_playstyle').html('');
    });

  // Show steam group settings
  $('#server_visibility').change(function() {
    if($('input[value="steamgroup"]').is(":checked")) {
      $('#steamgroupinfo').toggle();
    } else {
      $('#steamgroupinfo').hide();
    }
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

  // Help Button
  $('help-btn').on('click', function() {
  });

  // Cluster List
  $('.clusterItem').on('click', function() {
    changeCluster($(this).attr('value'));
    $('.clusterItem').removeClass('active');
    $(this).addClass('active');
  });

  /*$('#loadServer').on('click', function() {
    console.log("loading server");
  });*/

  $('#generateServer').on('click', function() {
    let run_server = ``;

    zip.file("cluster.ini", generateClusterIni());
    zip.file("cluster_token.txt", generateClusterToken());
    zip.file("run_server.bat", run_server);
    
    // Master Folder
    let Master = zip.folder("Master");
    Master.file("leveldataoverride.lua", generateMasterLevelDataOverride());
    Master.file("server.ini", generateMasterServerIni());
    Master.file("modoverrides.lua");

    // Caves Folder
    let Caves = zip.folder("Caves");
    Caves.file("leveldataoverride.lua", generateCavesLevelDataOverride());
    Caves.file("server.ini", generateCavesServerIni());
    Caves.file("modoverrides.lua");

    zip.generateAsync({type: "blob"})
      .then(function(content) {
        saveAs(content, "dst-server.zip");
      });
  });

  // Left/Previous Arrow
  $(function() {
    $('.arrow-left').click(function(){
      let current_tab = $('.tabButton.active').attr('value');
      if(current_tab === 'settings') {
        let clicked_div = $(this).closest('div').attr('id');
        if(!numericInputs.includes(clicked_div)) {
          let $span = $(this).closest('div').find('span[type="text"]');
          let new_status = getFromClusterSettingsObjectList(clicked_div).previous();
          if(new_status != undefined) {
            $span.text(new_status.capitalize());
          }
        } else {
          let $input = $(this).closest('div').find('input');
          let actual_value = parseInt($input.val());
          $input.val(actual_value-1);
        }
      }
      else if(current_tab === 'forest') {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = getFromWorldSettingsObjectList(id, 'forest').previous();
        $span.text(new_value);
      }
      else if(current_tab === 'caves') {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = getFromWorldSettingsObjectList(id, 'caves').previous();
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
        if(!numericInputs.includes(clicked_div)) {
          let $span = $(this).closest('div').find('span[type="text"]');
          let new_status = getFromClusterSettingsObjectList(clicked_div).next();
          if(new_status != undefined) {
            $span.text(new_status.capitalize());
          }
        } else {
          let $input = $(this).closest('div').find('input');
          let actual_value = parseInt($input.val());
          $input.val(actual_value+1);
        }
      } else if(current_tab === 'forest') {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = getFromWorldSettingsObjectList(id, 'forest').next();
        $span.text(new_value);
      } else if(current_tab === 'caves') {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = getFromWorldSettingsObjectList(id, 'caves').next();
        $span.text(new_value);
      } else if(current_tab === 'mods') {
        console.log("mods");
      }
    });
  });

  var cluster_settings_object_list = [];
  var world_settings_object_list = [];
  var forest_html = [];
  var caves_html = [];
  const numericInputs = ['players', 'max_snapshots', 'tick_rate', 'whitelist_slots'];
  const common_values = ['never', 'rare', 'default', 'often', 'always'];
  const season_values = ['noseason', 'veryshortseason', 'shortseason', 'default', 'longseason', 'verylongseason', 'random'];
  const speed_values = ['veryslow', 'slow', 'default', 'fast', 'veryfast'];

  const cluster_game_settings = {
    'game_mode' : {
      'values' : ['survival', 'endless', 'wilderness'],
      'initial' : 0
    },
    'pvp' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'server_mode' : {
      'values' : ['online', 'offline'],
      'initial' : 0
    },
    'console_enabled' : {
      'values' : ['false', 'true'],
      'initial' : 1
    },
    'autosaver_enabled' : {
      'values' : ['false', 'true'],
      'initial' : 1
    },
    'pause_when_empty' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'enable_vote_kick' : {
      'values' : ['false', 'true'],
      'initial' : 1
    },
    'cluster_language' : {
      'values' : ['en'],
      'initial' : 0
    },
    'offline_cluster' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'lan_only_cluster' : {
      'values' : ['false', 'true'],
      'initial' : 0
    }
  };
  const world_game_settings = {
    'forest' : {
      'Forest World' : { // MISC
        'biomes' : {
          'title' : 'Biomes',
          'values' : ['together', 'classic'],
          'default' : 1
        },
        'start_location' : {
          'title': 'World Gen: Spawn Area',
          'values': ['plus', 'darkness', 'default'],
        },
        'world_size' : {
          'title': 'World Gen: Size',
          'values': ['small', 'medium', 'default', 'huge'],
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

  class worldSettingItem {
    constructor(game_id, title, possible_values, actual_value, world, category) {
      this.game_id = game_id;
      this.title = title;
      this.possible_values = possible_values;
      this.actual_value = actual_value;
      this.world = world;
      this.category = category;
    }

    changeActual(new_value) {
      if(this.possible_values.includes(new_value)) {
        this.actual_value = new_value;
      }
    }

    previous() {
      if(this.possible_values.indexOf(this.actual_value) > 0) {
        let previous_value = this.possible_values[this.possible_values.indexOf(this.actual_value)-1];
        this.changeActual(previous_value);
        return previous_value;
      }
    }

    next() {
      if(this.possible_values.indexOf(this.actual_value) < this.possible_values.length-1) {
        let next_value = this.possible_values[this.possible_values.indexOf(this.actual_value)+1];
        this.changeActual(next_value);
        return next_value;
      }
    }

    isTheLastOne() {
      if(this.possible_values.indexOf(this.actual_value) == this.possible_values.length-1) {
        return true;
      }
    }

    isTheFirstOne() {
      if(this.possible_values.indexOf(this.actual_value) == 0) {
        return true;
      }
    }

    returnString() {
      return `${this.game_id} = "${this.actual_value}"`;
    }
  }

  class clusterSettingItem {
    constructor(game_id, possible_values, actual_value) {
      this.game_id = game_id;
      this.possible_values = possible_values;
      this.actual_value = actual_value;
    }

    changeActual(new_value) {
      if(this.possible_values.includes(new_value)) {
        this.actual_value = new_value;
      }
    }

    previous() {
      if(this.possible_values.indexOf(this.actual_value) > 0) {
        let previous_value = this.possible_values[this.possible_values.indexOf(this.actual_value)-1];
        this.changeActual(previous_value);
        return previous_value;
      }
    }

    next() {
      if(this.possible_values.indexOf(this.actual_value) < this.possible_values.length-1) {
        let next_value = this.possible_values[this.possible_values.indexOf(this.actual_value)+1];
        this.changeActual(next_value);
        return next_value;
      }
    }

    isTheLastOne() {
      if(this.possible_values.indexOf(this.actual_value) == this.possible_values.length-1) {
        return true;
      }
    }

    isTheFirstOne() {
      if(this.possible_values.indexOf(this.actual_value) == 0) {
        return true;
      }
    }

    getActualValue() {
      return this.actual_value;
    }
  }

  // Creatse cluster settings item object
  for(let item in cluster_game_settings) {
    cluster_settings_object_list.push(new clusterSettingItem(item, cluster_game_settings[item]['values'], cluster_game_settings[item]['values'][cluster_game_settings[item]['initial']]))
  }

  getFromClusterSettingsObjectList = id => {
    return cluster_settings_object_list.filter(setting => setting.game_id === id)[0].getActualValue();
  }

  getFromWorldSettingsObjectList = (id, world) => {
    return world_settings_object_list.filter(setting => setting.game_id === id && setting.world === world)[0];
  }

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
  }

  checkSteamGroup = () => $('input[value="steamgroup"]').is(":checked") ? true : false;

  checkIfCavesEnabled = () => $('#active_caves').css('display') == 'block' ? true : false;

  generateClusterIni = () => {
    let cluster_ini = (`[GAMEPLAY]\ngame_mode = ${getFromClusterSettingsObjectList('game_mode')}\nmax_players = ${$("input[name=max_players]").val()}\npvp = ${getFromClusterSettingsObjectList('pvp')}\npause_when_empty = ${getFromClusterSettingsObjectList('pause_when_empty')}\n[NETWORK]\ncluster_name = ${$("input[name=cluster_name]").val()}\ncluster_description = ${$("input[name=cluster_description]").val()}\ncluster_password = ${$("input[name=password]").val()}\ncluster_intention = ${cluster_intention.toLowerCase()}\nlan_only_cluster = ${getFromClusterSettingsObjectList('lan_only_cluster')}\noffline_cluster = ${getFromClusterSettingsObjectList('offline_cluster')}\ncluster_language = ${getFromClusterSettingsObjectList('cluster_language')}\nwhitelist_slots = ${$("input[name=whitelist_slots]").val()}\nautosaver_enabled = ${getFromClusterSettingsObjectList('autosaver_enabled')}\nenable_vote_kick = ${getFromClusterSettingsObjectList('enable_vote_kick')}\ntick_rate = ${$("input[name=tick_rate]").val()}\n[MISC]\nconsole_enabled = ${getFromClusterSettingsObjectList('console_enabled')}\nmax_snapshots = ${$("input[name=max_snapshots]").val()}\n[STEAM]\nsteam_group_only = ${checkSteamGroup()}\nsteam_group_id = ${$("input[name=steam_group_id]").val()}\nsteam_group_admins = ${$("span[name=steam_group_admins]").text().toLowerCase()}\n[SHARD]\nshard_enabled = ${checkIfCavesEnabled()}\nbind_ip = 127.0.0.1\nmaster_ip = 127.0.0.1\nmaster_port = 10888\ncluster_key = defaultPass`);
    return cluster_ini;
  }

  generateMasterLevelDataOverride = () => {
    let master_leveldataoverride = "return {\n";
    for(let item in world_settings_object_list) {
      if(world_settings_object_list[item].world == 'forest') {
        master_leveldataoverride += `${world_settings_object_list[item].returnString()},\n`
      }
    }
    master_leveldataoverride += "}";
    return master_leveldataoverride;
  }

  generateCavesLevelDataOverride = () => {
    let caves_leveldataoverride = "return {\n";
    for(let item in world_settings_object_list) {
      if(world_settings_object_list[item].world == 'caves') {
        caves_leveldataoverride += `${world_settings_object_list[item].returnString()},\n`
      }
    }
    caves_leveldataoverride += "}"; 
    return caves_leveldataoverride;
  }

  generateMasterServerIni = () => {
    let master_server_ini = (`[NETWORK]\nserver_port = 10999\n[SHARD]\nis_master = true\n[ACCOUNT]\nencode_user_path = true`);
    return master_server_ini;
  }

  generateCavesServerIni = () => {
    let caves_server_ini = (`[NETWORK]\nserver_port = 10998\n[SHARD]\nis_master = false\nname = Caves\n[ACCOUNT]encode_user_path = true\n[STEAM]\nmaster_server_port = 27017\nauthentication_port = 8767`);
    return caves_server_ini;
  }

  generateClusterToken = () => {
    let cluster_token = $("input[name=cluster_token]").val();
    return cluster_token;
  }

  // Create settings item object
  for(let world in world_game_settings) { // world = forest or caves
    for(let category in world_game_settings[world]) { // MISC, RESOURCES, UNPREPARED, ANIMALS, MONSTERS
      for(let item in world_game_settings[world][category]) { // settting item
        if(['Forest World', 'Cave World'].includes(category)) {
          world_settings_object_list.push(new worldSettingItem(item, world_game_settings[world][category][item]['title'], world_game_settings[world][category][item]['values'], 'default', world, category));
        } else {
          world_settings_object_list.push(new worldSettingItem(item, world_game_settings[world][category][item], common_values, 'default', world, category));
        }
      }
    }
  }
  
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