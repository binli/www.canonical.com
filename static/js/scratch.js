

//Provides basic templating for strings
String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

YUI().use('node', 'cookie', 'event-resize', 'event', 'jsonp', 'json-parse', function(Y) {
  core.setupAdditionalInfo = function() {
    Y.one('.find-out-more').setStyle('cursor', 'pointer').on('click',function(e) {
        this.toggleClass('active');
        Y.one('.external-link-list').toggleClass('active');
    });
  };

  core.tabbedContent = function() {
    Y.all('.tabbed-content .accordion-button').on('click', function(e){
      e.preventDefault();
      e.target.get('parentNode').toggleClass('open');
    });
  };

  core.sectionTabs = function () {
    if (Y.one('.tabbed-content')) {
      var p = Y.one('.tabbed-menu a.active'),
        s = p.get('href').split('#')[1],
        w = (p.get('clientWidth') / 2) - 7,
        x = (p.get('parentNode').getXY()[0] - p.get('parentNode').get('parentNode').getXY()[0]) + w;
      Y.all('.tabbed-menu a').on('click', function (e) {
        e.preventDefault();
        Y.all('.tabbed-menu a').removeClass('active');
        e.currentTarget.addClass('active');
        Y.all('.tabbed-content').addClass('hide');
        s = e.currentTarget.get('hash');
        Y.one(s).removeClass('hide');
        x = (e.currentTarget.get('parentNode').getXY()[0] - e.currentTarget.get('parentNode').get('parentNode').getXY()[0]) + w;
      });
    }
  };

  core.resizeListener = function() {
    Y.on('windowresize', function(e) {
      core.redrawGlobal();
    });
    core.globalInit();
  };

  core.createToggle = function(button) {
    if (bottonElement = Y.one(button)) {
      Y.one(bottonElement).setStyle('cursor', 'pointer').on('click',function(e) {
        this.toggleClass('active');
        this.next('div').toggleClass('active');
      });
    }
  };

  core.globalInit= function() {
    if (document.documentElement.clientWidth < 768) {
      core.globalPrepend = '.global-footer-wrapper';
      core.extendGlobalNav();
      core.setupAdditionalInfo();
      Y.one('.nav-global-wrapper').insert('<h2 class="toggle-menu__button">Ubuntu websites</h2>','before');
      core.createToggle('#nav-global h2');
    } else if (document.documentElement.clientWidth >= 768) {
      core.globalPrepend = 'body';
      core.extendGlobalNav();
    }
  };

  core.redrawGlobal = function() {
    var globalNav = Y.one("#nav-global");
    if (document.documentElement.clientWidth < 768 && core.globalPrepend != '.footer') {
      core.globalPrepend = '.global-footer-wrapper';
      if (globalNav) {
        globalNav.remove();
        core.extendGlobalNav();
        core.setupAdditionalInfo();
        Y.one('.nav-global-wrapper').insert('<h2 class="toggle-menu__button">Ubuntu websites</h2>','before');
        core.createToggle('#nav-global h2');
      }
    } else if (document.documentElement.clientWidth >= 768 && core.globalPrepend != 'body') {
      core.globalPrepend = 'body';
      if (globalNav) {
        globalNav.remove();
        core.extendGlobalNav();
      }
    }
  };

  core.extendGlobalNav = function() {
    core.setupGlobalNav();
    if (navGlobal = Y.one('#nav-global')) {
      navGlobal.addClass('toggle-menu');
    }

    if (navWrapper = Y.one('#nav-global .nav-global-wrapper')) {
      navWrapper.addClass('toggle-menu__content');
    }
  }

  core.setupAccordion = function() {
    Y.all('.row-project li').each(function(node) {
      node.one('h3').append('<span></span>');
      node.one('a').on('click',function(e) {
        e.preventDefault();
        this.toggleClass('active');
        this.next('div').toggleClass('active');
      });
    });
  };

  core.setupAccordion();
  core.sectionTabs();
  core.tabbedContent();
  core.resizeListener();
});
