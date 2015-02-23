(function($, undefined)
{
    ad.cube = function(cubeId,frontId,rightId,backId,leftId)
    {
        this.cubeId = cubeId;
        this.frontId = frontId;
        this.rightId = rightId;
        this.backId = backId;
        this.leftId = leftId;

        this.windowWidth = 213;
        this.ctr = 0;
        this.faces = new Array();
        this.nextZIndex = 100;
        this.isIe = false;                        
    };
    ad.cube.prototype.initialize = function()
    {
        this.isIe = ( this.getInternetExplorerVersion() > -1 );
        var theCube = document.getElementById( this.cubeId );
        var theContainer = theCube.parentNode;

        this.faces[0] = document.getElementById( this.frontId );
        this.faces[1] = document.getElementById( this.rightId );
        this.faces[2] = document.getElementById( this.backId );
        this.faces[3] = document.getElementById( this.leftId );

        //ad_replaceP( theContainer );
        if( !this.isIe )
        {
            this.setupPerspective( theContainer );
        }
        var isSupported = this.isSupported();
        if( isSupported )
        {
            this.makeVisible( this.leftId );
            this.makeVisible( this.rightId );
            this.makeVisible( this.backId );
        }

        this.doStandardTransform();
        this.doFaceTransform();

        //theContainer.className = '';

        if( !isSupported )
        {
            this.doTransformFunc = function () { return false; };
        }
        var that = this;
        setTimeout(function() { that.setSlowTransitions() }, 100);
    }
    ad.cube.prototype.setSlowTransitions = function ()
    {
        var theCube = document.getElementById( this.cubeId );
        theCube.className += ' ad_slowTransition';
        for( var i = 0; i < this.faces.length; i++ )
        {
            var elem = this.faces[i];
            elem.className += ' ad_slowTransition';
        }
    }

    ad.cube.prototype.applyFinalTransform = function ( elem, theTransform )
    {
        elem.style.transform = theTransform;
        elem.style.webkitTransform = theTransform;
        elem.style.MozTransform = theTransform;
        elem.style.OTransform = theTransform;
        elem.style.msTransform = theTransform;
    }

    ad.cube.prototype.doFaceTransform = function ()
    {
        var theRotation = this.ctr * (-90);
        for( var i = 0; i < this.faces.length; i++ )
        {
            var elem = this.faces[i];
            var additionalTransform = '';
            if( this.isIe )
            {
                additionalTransform = 'perspective(1000) translateZ(-' + this.windowWidth + 'px)';
                var active = this.ctr % 4;
                if( i == active )
                {
                    elem.style.zIndex = (this.ctr + 1) * 100;
                }
            }
            var theTransform = additionalTransform + ' rotateY(' + theRotation + 'deg) translateZ(' + this.windowWidth + 'px)';

            this.applyFinalTransform(elem, theTransform);

            theRotation += 90;
        }
    }

    ad.cube.prototype.doStandardTransform = function ()
    {
        var theRotation = this.ctr * (-90);
        var elem = document.getElementById(this.cubeId);
        var theTransform = 'translateZ(-' + this.windowWidth + 'px) rotateY(' + theRotation + 'deg)';
        this.applyFinalTransform(elem, theTransform);
    }

    ad.cube.prototype.doTransformFunc = function ()
    {
        this.ctr++;
        if( this.isIe )
        {
            this.doFaceTransform();
        } else
        {
            this.doStandardTransform();
        }
    };

    ad.cube.prototype.doRotation = function ()
    {
        this.doTransformFunc();
    }    

    ad.cube.prototype.getInternetExplorerVersion = function ()
    {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        var trident = ua.indexOf('Trident/');

        if( msie > 0 )
        {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        if( trident > 0 )
        {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        return -1;
    }

    ad.cube.prototype.isSupported = function ()
    {
        var isSupported = (("perspective" in document.body.style) ||
            ("-webkit-perspective" in document.body.style) ||
            ("-moz-perspective" in document.body.style) ||
            ("-o-perspective" in document.body.style) ||
            ("-ms-perspective" in document.body.style)
        );

        return isSupported;
    }

    ad.cube.prototype.makeVisible = function ( elemString )
    {
        var elem = document.getElementById(elemString);
        elem.style.visibility = 'visible';
    }

    ad.cube.prototype.setupPerspective = function ( theContainer )
    {        
        theContainer.style.webkitPerspective = '1000';
        theContainer.style.MozPerspective = '1000';
        theContainer.style.OPerspective = '1000';
        theContainer.style.msPerspective = '1000';
        theContainer.style.Perspective = '1000';
    }    
}( window.ad = window.ad || {} ) );
