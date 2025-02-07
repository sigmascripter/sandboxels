/* Made by: NecroticPhantom
   With help from: voidapex11 */

// For change log: "+" = addition, "-" = removal and "~" = change. L, R, U, D corresponds to LEFT, RIGHT, UP and DOWN

/*
===CHANGE LOG===
	Version: 1.0.0 (Drills.js)
@Necrotic_Phantom & @voidapex11
+ steel drill L, R, U & D
+ steel drill missile L, R, U & D
+ diamond drill L, R, U & D
+ diamond drill missile L, R, U & D
+ void drill L, R, U & D
+ void drill missile L, R, U & D
+ drills.js info (drills_info) element to 'mods' category
~ fixed steel/diamond/void drill R & steel/diamond/void drill missile R crashing upon border collision
~ made steel/diamond/void drill missile L, R, U & D explode upon contact with canvas edge
~ committed

	Version: 1.0.1 (No Hardness Fix)
@NecroticPhantom
~ fixed steel/diamond/void drill L, R, U & D + steel/diamond/void drill missile L, R, U & D not breaking pixels with no listed hardness

	Version: 2.0.0 (Drills Revamped (AKA Reverse Drills))
@NecroticPhantom
+ maxSize: 1 to all drills without it
~ rewrote drills and functions so no longer need L, R, U and D versions of all drills
- L, R, U and D versions of all drills
~ rewrote drills and functions so no longer need 1 function per drill material
- drill material-specific functions
- drill color variables
~ changed breakInto and stateHigh for most drills
~ changed density, tempHigh and conductivity of all drills
~ renamed 'drills.js_info' element to 'drills.js'
+ steel, diamond and void reverse drills
*/



// info element
elements.drills_info = {
	color: "#000000",
	name: "drills.js",
	category: "Mods",
	behavior: behaviors.SELFDELETE,
	maxSize: 1,
	tool: function(pixel) {},
	onSelect: function(pixel) {
		let mod_info = "The drills.js mod adds different kinds of drills to a new 'drills' category.\n\nMod made by: Necrotic_Phantom. \n With help from: voidapex11."
		alert(mod_info)
	return
	},
};



// functions
drill_function = function(pixel, dif_x, dif_y) {
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			var pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
			if (elements[pxl.element].hardness <= pixel.hardness || elements[pxl.element].hardness == undefined) {
				deletePixel(pixel.x + dif_x, pixel.y + dif_y);
			};
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	};
};

drill_missile_function = function(pixel, dif_x, dif_y) {
	if (pixel.die == 0) {
		deletePixel(pixel.x, pixel.y);
		explodeAt(pixel.x, pixel.y, 15);
		return;
	};
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		var pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			pixel.primed = true;
			if (elements[pxl.element].hardness <= pixel.hardness) {
				deletePixel(pixel.x + dif_x, pixel.y + dif_y);
			}
			else if (elements[pxl.element].hardness == undefined) {
				deletePixel(pixel.x + dif_x, pixel.y + dif_y);
			};
		}
		else if (pixel.primed) {
			pixel.die--;
			return;
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	}
	else if (outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		deletePixel(pixel.x, pixel.y);
		explodeAt(pixel.x, pixel.y, 15);
	};
};

reverse_drill_function = function(pixel, dif_x, dif_y, drill_element) {
	if (!outOfBounds(pixel.x + dif_x, pixel.y + dif_y)) {
		if (!isEmpty(pixel.x + dif_x, pixel.y + dif_y)) {
			var pxl = pixelMap[pixel.x + dif_x][pixel.y + dif_y];
			if (elements[pxl.element].hardness <= pixel.hardness || elements[pxl.element].hardness == undefined) {
				deletePixel(pixel.x + dif_x, pixel.y + dif_y);
			};
		};
		tryMove(pixel, pixel.x + dif_x, pixel.y + dif_y);
	};
	if (isEmpty(pixel.x - dif_x, pixel.y - dif_x)) {
		createPixel(drill_element, pixel.x - dif_x, pixel.y - dif_y);
	};
};



// elements
elements.steel_drill = {
	color: "#71797e",
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "molten_steel", "molten_iron", "molten_tin"],
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_drill = {
	color: "#03fcec",
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "diamond", "molten_iron", "molten_tin"],
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_drill = {
	color: "#262626",
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		drill_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "void", "molten_iron", "molten_tin"],
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_drill_missile = {
	color: ["#71797e", "#ff0000"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		die: -1,
		primed: false,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.die == -1) {
			pixel.die = Number(prompt("How many ticks (after priming) until explosion (enter as number)? "));
		};
		drill_missile_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "molten_steel", "molten_iron", "molten_tin"],
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_drill_missile = {
	color: ["#03fcec", "#ff0000"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		die: -1,
		primed: false,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.die == -1) {
			pixel.die = Number(prompt("How many ticks (after priming) until explosion (enter as number)? "));
		};
		drill_missile_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "diamond", "molten_iron", "molten_tin"],
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_drill_missile = {
	color: ["#262626", "#ff0000"],
	properties: {
		x_direction: 0,
		y_direction: 0,
		die: -1,
		primed: false,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		if (pixel.die == -1) {
			pixel.die = Number(prompt("How many ticks (after priming) until explosion (enter as number)? "));
		};
		drill_missile_function(pixel, pixel.x_direction, pixel.y_direction);
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "void", "molten_iron", "molten_tin"],
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.steel_reverse_drill = {
	color: "#e79717", //reverse drill colours are the hexidecimal for the origional drills but reversed
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		reverse_drill_function(pixel, pixel.x_direction, pixel.y_direction, "steel");
	},
	category: "Drills",
	breakInto: ["metal_scrap", "steel", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "molten_steel", "molten_iron", "molten_tin"],
	density: 7850,
	hardness: 0.8,
	conduct: 0.42,
	state: "solid",
	maxSize: 1,
};

elements.diamond_reverse_drill = {
	color: "#cecf30", //reverse drill colours are the hexidecimal for the origional drills but reversed
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		reverse_drill_function(pixel, pixel.x_direction, pixel.y_direction, "diamond");
	},
	category: "Drills",
	breakInto: ["metal_scrap", "diamond", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "diamond", "molten_iron", "molten_tin"],
	density: 3515,
	hardness: 0.99,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};

elements.void_reverse_drill = {
	color: "#626262", //reverse drill colours are the hexidecimal for the origional drills but reversed
	properties: {
		x_direction: 0,
		y_direction: 0,
	},
	tick: function(pixel) {
		if (pixel.x_direction == 0 && pixel.y_direction == 0) {
			pixel.x_direction = Number(prompt("Move left, right or neither (Type: -1, 1 or 0 respectively)? "));
			if (pixel.x_direction == 0) {
				pixel.y_direction = Number(prompt("Move up or down (Type: -1 or 1 respectively)? "));
			};
		};
		reverse_drill_function(pixel, pixel.x_direction, pixel.y_direction, "void");
	},
	category: "Drills",
	breakInto: ["metal_scrap", "void", "iron", "tin"],
	tempHigh: 1455.5,
	stateHigh: ["molten_aluminium", "void", "molten_iron", "molten_tin"],
	density: 7850,
	hardness: 1,
	conduct: 0.01,
	state: "solid",
	maxSize: 1,
};