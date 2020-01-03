$(document).ready(function () {
  const zip = new JSZip();
  const common_values = ['never', 'rare', 'default', 'often', 'always'];
  const season_values = ['noseason', 'veryshortseason', 'shortseason', 'default', 'longseason', 'verylongseason', 'random'];
  const speed_values = ['veryslow', 'slow', 'default', 'fast', 'veryfast'];
  const numeric_inputs = ['max_players', 'max_snapshots', 'tick_rate', 'whitelist_slots'];
  const world_game_settings = {
    'forest' : {
      'Forest World' : { // MISC
        'biomes' : {
          'title' : 'Biomes',
          'values' : ['together', 'classic'],
          'default' : 0
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
          'values' : ['underground'],
          'default' : 0
        },
        'start_location' : {
          'title' : 'World Gen: Spawn Area',
          'values' : ['caves'],
          'default' : 0
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
  const presets = {
    'default_cluster': {
      'cluster_intention' : null,
      'cluster_name' : null,
      'cluster_description' : null,
      'steam_group_only' : false,
      'game_mode' : 'survival',
      'pvp' : false,
      'max_players' : 6,
      'cluster_password' : null,
      'server_mode' : 'online',
      'cluster_token' : null,
      'max_snapshots' : 6,
      'console_enabled' : true,
      'offline_cluster' : false,
      'tick_rate' : 15,
      'whitelist_slots' : 0,
      'lan_only_cluster' : false,
      'autosaver_enabled' : true,
      'pause_when_empty' : false,
      'enable_vote_kick' : true,
      'cluster_language' : 'en'
    }
  };
  const cluster_game_settings = {
    //[GAMEPLAY]
    'game_mode' : {
      'values' : ['survival', 'endless', 'wilderness'],
      'initial' : 0
    },
    'max_players' : {
      'initial' : 6
    },
    'pause_when_empty' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'pvp' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    //[NETWORK]
    'cluster_name' : {
      'initial': ''
    },
    'cluster_description' : {
      'initial': ''
    },
    'cluster_password' : {
      'initial': ''
    },
    'cluster_intention' : {
      'initial': ''
    },
    'lan_only_cluster' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'offline_cluster' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'cluster_language' : {
      'values' : ['en'],
      'initial' : 0
    },
    'whitelist_slots' : {
      'initial' : 0
    },
    'autosaver_enabled' : {
      'values' : ['false', 'true'],
      'initial' : 1
    },
    'enable_vote_kick' : {
      'values' : ['false', 'true'],
      'initial' : 1
    },
    'tick_rate' : {
      'values' : [15, 20, 30, 60],
      'initial' : 0
    },
    //[MISC]
    'console_enabled' : {
      'values' : ['false', 'true'],
      'initial' : 1
    },
    'max_snapshots' : {
      'initial' : 6
    },
    //[STEAM]
    'steam_group_only' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    'steam_group_id' : {
      'initial': ''
    },
    'steam_group_admins' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    //[SHARD]
    'shard_enabled' : {
      'values' : ['false', 'true'],
      'initial' : 0
    },
    //[IDK]
    'server_mode' : {
      'values' : ['online', 'offline'],
      'initial' : 0
    },
    'cluster_token' : {
      'initial': ''
    }
  };
  var world_settings_objects = [];
  var cluster_settings_objects = [];
  var forest_html = [];
  var caves_html = [];
  var clusterList = [];

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
      if(this.possible_values.indexOf(this.actual_value) === this.possible_values.length-1) {
        return true
      }
    }

    isTheFirstOne() {
      if(this.possible_values.indexOf(this.actual_value) === 0) {
        return true
      }
    }

    returnString() {
      return `${this.game_id} = "${this.actual_value}"`
    }
  }

  class cluster {
    constructor(clusterID, clusterSettings, hasCaves, master_leveldataoverride, caves_leveldataoverride) {
      this.clusterID = clusterID;
      this.clusterSettings = clusterSettings;
      this.hasCaves = hasCaves;
      this.master_leveldataoverride = master_leveldataoverride;
      this.caves_leveldataoverride = caves_leveldataoverride;
      /*this.master_server_ini = master_server_ini;
      this.caves_server_ini = caves_server_ini;*/
    }

    changeClusterID(new_id) {
      this.clusterID = new_id;
    }

    getClusterID() {
      return this.clusterID;
    }

    getClusterSettings() {
      return this.clusterSettings;
    }

    getClusterSettingItem(id) {
      return this.clusterSettings.filter(setting => setting.game_id === id)[0];
    }

    getWorldSettingsObjectItem(id, world) {
      if(world === 'forest') {
        return this.master_leveldataoverride.filter(setting => setting.game_id === id)[0];
      } else if(world === 'caves') {
        return this.caves_leveldataoverride.filter(setting => setting.game_id === id)[0];
      }
    }

    getCavesStatus() {
      return this.hasCaves;
    }

    toggleCaves() {
      this.hasCaves = !this.hasCaves;
    }

    getMasterLevelDataOverride() {
      return this.master_leveldataoverride;
    }

    getCavesLevelDataOverride() {
      return this.caves_leveldataoverride;
    }
  }

  class clusterSettingItem {
    constructor(game_id, possible_values, actual_value) {
      this.game_id = game_id;
      this.possible_values = possible_values;
      this.actual_value = actual_value;
    }

    getActualValue() {
      return this.actual_value;
    }

    getGameID() {
      return this.game_id;
    }

    changeActual(new_value) {
      this.actual_value = new_value;
    }

    previous() {
      let indexOfActualValue = this.possible_values.indexOf(this.actual_value);
      if(indexOfActualValue > 0) {
        let previous_value = this.possible_values[indexOfActualValue-1];
        this.changeActual(previous_value);
        return previous_value;
      }
    }

    next() {
      let indexOfActualValue = this.possible_values.indexOf(this.actual_value);
      if(indexOfActualValue < this.possible_values.length-1) {
        let next_value = this.possible_values[indexOfActualValue+1];
        this.changeActual(next_value);
        return next_value;
      }
    }

    isTheLastOne() {
      return this.possible_values.indexOf(this.actual_value) === this.possible_values.length-1 ? true : false;
    }

    isTheFirstOne() {
      return this.possible_values.indexOf(this.actual_value) === 0 ? true : false;
    }
  }

  const stripMargin = (template, ...expressions) => {
    let result = template.reduce((accumulator, part, i) => {
      return accumulator + expressions[i - 1] + part
    })
    return result.replace(/\r?(\n)\s*\|/g, '$1');
  }

  const generateClusterIni = clusterSettings => {
    return(stripMargin`[GAMEPLAY]
    |game_mode = ${clusterSettings.filter(setting => setting.getGameID() === 'game_mode')[0].getActualValue()}
    |max_players = ${clusterSettings.filter(setting => setting.getGameID() === 'max_players')[0].getActualValue()}
    |pause_when_empty = ${clusterSettings.filter(setting => setting.getGameID() == 'pause_when_empty')[0].getActualValue()}
    |pvp = ${clusterSettings.filter(setting => setting.getGameID() == 'pvp')[0].getActualValue()}
    |[NETWORK]
    |cluster_name = ${clusterSettings.filter(setting => setting.getGameID() === 'cluster_name')[0].getActualValue()}
    |cluster_description = ${clusterSettings.filter(setting => setting.getGameID() === 'cluster_description')[0].getActualValue()}
    |cluster_password = ${clusterSettings.filter(setting => setting.getGameID() === 'cluster_password')[0].getActualValue()}
    |cluster_intention = ${clusterSettings.filter(setting => setting.getGameID() === 'cluster_intention')[0].getActualValue()}
    |lan_only_cluster = ${clusterSettings.filter(setting => setting.getGameID() === 'lan_only_cluster')[0].getActualValue()}
    |offline_cluster = ${clusterSettings.filter(setting => setting.getGameID() === 'offline_cluster')[0].getActualValue()}
    |cluster_language = ${clusterSettings.filter(setting => setting.getGameID() === 'cluster_language')[0].getActualValue()}
    |whitelist_slots = ${clusterSettings.filter(setting => setting.getGameID() === 'whitelist_slots')[0].getActualValue()}
    |autosaver_enabled = ${clusterSettings.filter(setting => setting.getGameID() === 'autosaver_enabled')[0].getActualValue()}
    |enable_vote_kick = ${clusterSettings.filter(setting => setting.getGameID() === 'enable_vote_kick')[0].getActualValue()}
    |tick_rate = ${clusterSettings.filter(setting => setting.getGameID() === 'tick_rate')[0].getActualValue()}
    |[MISC]
    |console_enabled = ${clusterSettings.filter(setting => setting.getGameID() === 'console_enabled')[0].getActualValue()}
    |max_snapshots = ${clusterSettings.filter(setting => setting.getGameID() === 'max_snapshots')[0].getActualValue()}
    |[STEAM]
    |steam_group_only = ${clusterSettings.filter(setting => setting.getGameID() === 'steam_group_only')[0].getActualValue()}
    |steam_group_id = ${clusterSettings.filter(setting => setting.getGameID() === 'steam_group_id')[0].getActualValue()}
    |steam_group_admins = ${clusterSettings.filter(setting => setting.getGameID() === 'steam_group_admins')[0].getActualValue()}
    |[SHARD]
    |shard_enabled = ${clusterSettings.filter(setting => setting.getGameID() === 'shard_enabled')[0].getActualValue()}
    |bind_ip = 127.0.0.1
    |master_ip = 127.0.0.1
    |master_port = 10888
    |cluster_key = defaultPass`
    )
  }

  const generateMasterLevelDataOverride = master_leveldataoverride => {
    let master_map = master_leveldataoverride.map((item) => {
      if(item.world === 'forest')
        return (`\n    ${item.returnString()}`)
    })
    return (`return {\n  override_enabled = true,\n  preset = "",\n  overrides = {  ${master_map}\n  },\n}`)
  }

  const generateCavesLevelDataOverride = caves_leveldataoverride => {
    let caves_map = caves_leveldataoverride.map((item) => {
      if(item.world === 'caves')
        return (`\n    ${item.returnString()}`)
    })
    return (`return {\n  override_enabled = true,\n  preset = "",\n  overrides = {  ${caves_map}\n  },\n}`)
  }

  const generateMasterServerIni = () => {
    return (stripMargin`[NETWORK]
    |server_port = 10999
    |
    |[SHARD]
    |is_master = true
    |
    |[ACCOUNT]
    |encode_user_path = true`
    )
  }

  const generateCavesServerIni = () => {
    return (stripMargin`[NETWORK]
    |server_port = 10998
    |
    |[SHARD]
    |is_master = false
    |name = Caves
    |
    |[ACCOUNT]
    |encode_user_path = true
    |
    |[STEAM]
    |master_server_port = 27017
    |authentication_port = 8767`
    )
  }

  const buildHtmlItem = (game_id, title, actual_value) => {
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
    )
  }

  const currentClusterID = () => parseInt($('#clusterList li.active').attr('value'));

  const getCluster = targetClusterID => clusterList.filter(cluster => cluster.getClusterID() === targetClusterID)[0];

  const addCluster = () => {
  }

  const deleteCluster = () => {
  }

  const saveCluster = targetClusterID => {
    let cluster_save = getCluster(targetClusterID);
  }

  const changeCluster = targetClusterID => {
    let my_cluster = getCluster(targetClusterID);
    let clusterSettings = my_cluster.getClusterSettings();
    console.log(clusterSettings);
    //let worldSettings = my_cluster.getMasterLevelDataOverride();
    //let cavesSettings = my_cluster.getCavesLevelDataOverride();

    $('#play_style_str').html(my_cluster.getClusterSettingItem('cluster_intention').getActualValue());
    $("input[name=cluster_name]").val(my_cluster.getClusterSettingItem('cluster_name').getActualValue());
    //$('') // public or steam group my_cluster.getClusterSettingItem('steam_group_only').getActualValue());
    $("input[name=cluster_description]").val(my_cluster.getClusterSettingItem('cluster_description').getActualValue());
    $('#game_mode').find('span[type="text"]').html(my_cluster.getClusterSettingItem('game_mode').getActualValue());
    $('#pvp').find('span[type="text"]').html(my_cluster.getClusterSettingItem('pvp').getActualValue());
    $("input[name=max_players]").val(my_cluster.getClusterSettingItem('max_players').getActualValue());
    $("input[name=password]").val(my_cluster.getClusterSettingItem('cluster_password').getActualValue());
    $('#server_mode').find('span[type="text"]').html(my_cluster.getClusterSettingItem('server_mode').getActualValue());
    $("input[name=cluster_token]").val(my_cluster.getClusterSettingItem('cluster_token').getActualValue());
    $("input[name=max_snapshots]").val(my_cluster.getClusterSettingItem('max_snapshots').getActualValue());
    $('#console_enabled').find('span[type="text"]').html(my_cluster.getClusterSettingItem('console_enabled').getActualValue());
    $('#offline_cluster').find('span[type="text"]').html(my_cluster.getClusterSettingItem('offline_cluster').getActualValue());
    $("input[name=tick_rate]").val(my_cluster.getClusterSettingItem('tick_rate').getActualValue());
    $("input[name=whitelist_slots]").val(my_cluster.getClusterSettingItem('whitelist_slots').getActualValue());
    $('#lan_only_cluster').find('span[type="text"]').html(my_cluster.getClusterSettingItem('lan_only_cluster').getActualValue());
    $('#autosaver_enabled').find('span[type="text"]').html(my_cluster.getClusterSettingItem('autosaver_enabled').getActualValue());
    $('#pause_when_empty').find('span[type="text"]').html(my_cluster.getClusterSettingItem('pause_when_empty').getActualValue());
    $('#enable_vote_kick').find('span[type="text"]').html(my_cluster.getClusterSettingItem('enable_vote_kick').getActualValue());
    $("input[name=cluster_language]").val(my_cluster.getClusterSettingItem('cluster_language').getActualValue());
  }

  const showPlayStyleSelector = targetClusterID => {
    let cluster_intention = getCluster(currentClusterID()).getClusterSettingItem('cluster_intention');
    if(cluster_intention === undefined) {
      //a
    }
  }

  // Create world settings item object
  for(let world in world_game_settings) { // world = forest or caves
    for(let category in world_game_settings[world]) { // MISC, RESOURCES, UNPREPARED, ANIMALS, MONSTERS
      for(let item in world_game_settings[world][category]) { // settting item
        if(['Forest World', 'Cave World'].includes(category)) {
          let title = world_game_settings[world][category][item]['title'];
          let possible_values = world_game_settings[world][category][item]['values'];
          let actual_value;
          if(world_game_settings[world][category][item].hasOwnProperty('default')) {
            actual_value = world_game_settings[world][category][item]['values'][world_game_settings[world][category][item]['default']];
          } else {
            actual_value = 'default';
          }
          world_settings_objects.push(new worldSettingItem(item, title, possible_values, actual_value, world, category));
        } else {
          world_settings_objects.push(new worldSettingItem(item, world_game_settings[world][category][item], common_values, 'default', world, category));
        }
      }
    }
  }

  // Create cluster settings item object
  for(let item in cluster_game_settings) {
    if(Object.keys(cluster_game_settings[item]).length === 2) {
      cluster_settings_objects.push(new clusterSettingItem(item, cluster_game_settings[item]['values'], cluster_game_settings[item]['values'][cluster_game_settings[item]['initial']]));
    } else {
      cluster_settings_objects.push(new clusterSettingItem(item, null, cluster_game_settings[item]['initial']));
    }
  }

  // Build html settings items
  for(let world in world_game_settings) {
    if(world === 'forest') {
      for(let category in world_game_settings[world]) {
        forest_html += `<div class="option_background">${category}</div><ul>`
        for(let obj in world_settings_objects) {
          if(world_settings_objects[obj].category === category && world_settings_objects[obj].world === world) {
            forest_html += buildHtmlItem(world_settings_objects[obj].game_id, world_settings_objects[obj].title, world_settings_objects[obj].actual_value);
          }
        }
        forest_html += '</ul>';
      }
    } else if(world === 'caves') {
      for(let category in world_game_settings[world]) {
        caves_html += `<div class="option_background">${category}</div><ul>`
        for(let obj in world_settings_objects) {
          if(world_settings_objects[obj].category === category && world_settings_objects[obj].world === world) {
            caves_html += buildHtmlItem(world_settings_objects[obj].game_id, world_settings_objects[obj].title, world_settings_objects[obj].actual_value);
          }
        }
        caves_html += '</ul>';
      }
    }
  }

  const templateCluster = new cluster(0, cluster_settings_objects, false, 
    world_settings_objects.filter(setting => setting.world === 'forest'), 
    world_settings_objects.filter(setting => setting.world === 'caves')
  );
  let cluster1 = _.cloneDeep(templateCluster);
  cluster1.changeClusterID(1);
  clusterList.push(cluster1);

  document.getElementById("forestSettings").innerHTML = forest_html;
  document.getElementById("cavesSettings").innerHTML = caves_html;

  // Change Cluster
  $('#clusterList li').on('click', function() {
    saveCluster(currentClusterID());
    let clickedClusterID = parseInt($(this).attr('value'));
    changeCluster(clickedClusterID);
    if(getCluster(clickedClusterID).getCavesStatus()){
      $('#addCavesMsg').hide();
      $('#active_caves').show();
    } else {
      $('#addCavesMsg').show();
      $('#active_caves').hide();
    }
    $('#clusterList li').removeClass('active');
    $(this).addClass('active');
  });

  $('#addCluster').on('click', function() {
    console.log("cluster added");
  });

  // Tabs
  $('.tabButton').on('click', function() {
    $('.tab').hide();
    $('.tabButton').removeClass('active');
    $('#'+$(this).attr('value')).show();
    $(this).addClass('active');
  });

  // Settings Tab
  $('#settings').show();
  $('.tabButton').first().addClass('active');

  // Show playstyle selector
  $('.play_style_buttons, #play_style_str').on('click', function() {
    let cluster_intention = $(this).attr('id');
    getCluster(currentClusterID()).getClusterSettingItem('cluster_intention').changeActual(cluster_intention);
    $('#play_style_str').html(cluster_intention);
    $('#choice_play_style').toggle();
    $('#after_play_style').toggle();
    $('#manage').toggle();
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
    getCluster(currentClusterID()).toggleCaves();
  });

  // Help Button
  $('.help-btn').on('click', function() {
    console.log('')
  });

  $('#generateServer').on('click', function() {
    clusterList.map((clusterItem) => {
      let cluster_folder = zip.folder(`Cluster_${clusterItem.getClusterID()}`);
      cluster_folder.file('cluster.ini', generateClusterIni(clusterItem.getClusterSettings()));
      cluster_folder.file('cluster_token.txt', clusterItem.getClusterSettingItem('cluster_token').getActualValue());
      
      // Master Folder
      let master = cluster_folder.folder('Master');
      master.file('leveldataoverride.lua', generateMasterLevelDataOverride(clusterItem.getMasterLevelDataOverride()));
      master.file('server.ini', generateMasterServerIni());
      master.file("modoverrides.lua");

      // Caves Folder
      let caves = cluster_folder.folder('Caves');
      caves.file('leveldataoverride.lua', generateCavesLevelDataOverride(clusterItem.getCavesLevelDataOverride()));
      caves.file('server.ini', generateCavesServerIni());
      caves.file("modoverrides.lua");
    })

    zip.generateAsync({type: 'blob'})
      .then(function(content) {
        saveAs(content, 'dst-server.zip');
      });
  });

  // Left/Previous Arrow
  $(function() {
    $('.arrow-left').click(function() {
      let current_tab = $('.tabButton.active').attr('value');
      if(current_tab === 'settings') {
        let clicked_div = $(this).closest('div').attr('id');
        if(!numeric_inputs.includes(clicked_div)) {
          let $span = $(this).closest('div').find('span[type="text"]');
          let new_status = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).previous();
          let isTheFirstOne = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).isTheFirstOne();
          if(isTheFirstOne) {
            $(this).closest('div').find('button[class="arrow-left"]').attr('disabled', true);
            $(this).closest('div').find('button[class="arrow-right"]').attr('disabled', false);
          } else {
            $(this).closest('div').find('button[class="arrow-right"]').attr('disabled', false);
          }
          $span.text(new_status);
        }
        else {
          let $input = $(this).closest('div').find('input');
          let actual_input_value = parseInt($input.val());
          let new_value = actual_input_value-1;
          if(clicked_div === 'max_players' && new_value > 0) {
            getCluster(currentClusterID()).getClusterSettingItem(clicked_div).changeActual(new_value);
            $input.val(new_value);
          }
          else if(clicked_div === 'tick_rate') {
            let new_value = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).previous();
            let isTheFirstOne = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).isTheFirstOne();
            if(isTheFirstOne) {
              $(this).closest('div').find('button[class="arrow-left"]').attr('disabled', true);
            } else {
              $(this).closest('div').find('button[class="arrow-right"]').attr('disabled', false);
            }
            $input.val(new_value);
          }
          else if(!['max_players','tick_rate'].includes(clicked_div) && actual_input_value-1 >= 0) {
            $input.val(actual_input_value-1);
          }
        }
      }
      else if(['forest', 'caves'].includes(current_tab)) {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = getCluster(currentClusterID()).getWorldSettingsObjectItem(id, current_tab).previous();
        let isTheFirstOne = getCluster(currentClusterID()).getWorldSettingsObjectItem(id, current_tab).isTheFirstOne();
        if(isTheFirstOne) {
          $(this).closest('footer').find('button[class="arrow-left"]').attr('disabled', true);
          $(this).closest('footer').find('button[class="arrow-right"]').attr('disabled', false);
        } else {
          $(this).closest('footer').find('button[class="arrow-right"]').attr('disabled', false);
        }
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
        if(!numeric_inputs.includes(clicked_div)) {
          let $span = $(this).closest('div').find('span[type="text"]');
          let new_status = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).next();
          let isTheLastOne = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).isTheLastOne();
          if(isTheLastOne) {
            $(this).closest('div').find('button[class="arrow-right"]').attr('disabled', true);
            $(this).closest('div').find('button[class="arrow-left"]').attr('disabled', false);
          } else {
            $(this).closest('div').find('button[class="arrow-left"]').attr('disabled', false);
          }
          $span.text(new_status);
        }
        else {
          let $input = $(this).closest('div').find('input');
          let actual_input_value = parseInt($input.val());
          if(clicked_div === 'tick_rate') {
            let new_value = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).next();
            let isTheLastOne = getCluster(currentClusterID()).getClusterSettingItem(clicked_div).isTheLastOne();
            if(isTheLastOne) {
              $(this).closest('div').find('button[class="arrow-right"]').attr('disabled', true);
              $(this).closest('div').find('button[class="arrow-left"]').attr('disabled', false);
            } else {
              $(this).closest('div').find('button[class="arrow-left"]').attr('disabled', false);
            }
            $input.val(new_value);
          }
          else {
            let new_value = actual_input_value+1;
            getCluster(currentClusterID()).getClusterSettingItem(clicked_div).changeActual(new_value);
            $input.val(new_value);
          }
        }
      }
      else if(['forest', 'caves'].includes(current_tab)) {
        let $span = $(this).parent().find('span[name]');
        let id = $span.attr('name');
        let new_value = getCluster(currentClusterID()).getWorldSettingsObjectItem(id, current_tab).next();
        let isTheLastOne = getCluster(currentClusterID()).getWorldSettingsObjectItem(id, current_tab).isTheLastOne();
        if(isTheLastOne) {
          $(this).closest('footer').find('button[class="arrow-right"]').attr('disabled', true);
          $(this).closest('footer').find('button[class="arrow-left"]').attr('disabled', false);
        } else {
          $(this).closest('footer').find('button[class="arrow-left"]').attr('disabled', false);
        }
        $span.text(new_value);
      }
      else if(current_tab === 'mods') {
        console.log("mods");
      }
    });
  });
});