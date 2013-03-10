var node = function(userNode) {
	
	var slice = this.slice = Array.prototype.slice;
	
	var checkRegexp = {
		nodeId    : new RegExp(/^#[-_a-z0-9]+$/i),
		nodeClass : new RegExp(/^\.[-_a-z0-9]+$/i),
		nodeTag   : new RegExp(/^[-_a-z0-9]+$/i)
	};
	
	var targetNode = function() {
		if(userNode === undefined)
			return undefined;
			
		if(typeof userNode != 'string') 
			throw new Error("invalid argument");
	
		return userNode.match(checkRegexp.nodeId)  ? new Array(document.getElementById(userNode.substr(1))) :
                                                  // adding all elements to array:
			   userNode.match(checkRegexp.nodeClass) ? slice.call(document.getElementsByClassName(userNode.substr(1))):
			   userNode.match(checkRegexp.nodeTag)   ? slice.call(document.getElementsByTagName(userNode)) : 
                                                 slice.call(document.querySelectorAll(userNode));
	};
	
	var elements = this.elements = targetNode();
	this.tempUserNode = userNode;
	
	return this;
};


node.prototype = {

	attrAdd : function(userName, userValue) {
		temp = this.elements; 
		l = temp.length;
		while(l--) temp[l].setAttribute(userName, userValue);
	},
	
	attrRemove : function(userName) {
		temp = this.elements; 
		l = temp.length;
		while(l--) temp[l].removeAttribute(userName);
	},
	
	classFilter : function(userSelector) {
		if(userSelector != undefined) {
			userSelector = "." + userSelector;
			temp = this.elements;
			l = temp.length;
			while(l--) resultElem = this.slice.call(temp[l].parentNode.querySelectorAll(this.tempUserNode+userSelector));
			return resultElem;
		} 
		else throw new Error('searchable class undefined');	
	},
	
	classAdd : function(userClass) {
		function addClass(Object, Class) {
			var classes = Object.className.split(' ');
			classes.push(Class);
			Object.className = classes.join(' ');
		}
		temp = this.elements;
		l = temp.length;
		while(l--) addClass(temp[l], userClass);
	},
	
	classRemove: function(userClass) {
		function removeClass(Object, Class) {
			var classes = Object.className.split(' ');
			for(i = 0; i < classes.length; i++) {
				if (classes[i] == Class) {
				  classes.splice(i, 1);
				  i--; 
				}
			}
			Object.className = classes.join(' ');	
		}
	
		temp = this.elements;
		l = temp.length;
		while(l--) removeClass(temp[l], userClass);
	},
	
	classExists: function(userClass) {
		function hasClass(Object, Class) {
			var classes = Object.className.split(' ');
			for(i = 0; i < classes.length; i++) {
				if (classes[i] == Class) {
				  return true;
				  i--; 
				}
			}
			return false;
		}
		temp = this.elements;
		l = temp.length;
		while(l--) result = hasClass(temp[l], userClass);
		return result;
	},
	
	idChange : function(userId) {
		temp = this.elements;
		l = temp.length;
		while(l--) temp[l].setAttribute("id", userId);
	},
	
	elemRemove : function() {
		temp = this.elements;
		l = temp.length;
		while(l--) temp[l].parentNode.removeChild(temp[l]);
	},
	
	elemEach : function(elem) {
		this.elements.forEach(elem);
	},
	
	eventAdd : function(event, fn) {
		temp = this.elements;
		l = temp.length;
		while(l--) temp[l].addEventListener(event, fn, false);
	}
};

$_dom = function(arg) {
	return new node(arg);
}
