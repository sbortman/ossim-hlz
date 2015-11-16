<%--
  Created by IntelliJ IDEA.
  User: sbortman
  Date: 11/13/15
  Time: 1:43 PM
--%>
<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
<head>
    <title>HLZ</title>
    <asset:stylesheet src="ossimHLZ.css"/>
</head>

<body>

<div class="container">
    <br/>
    <div class="row alert alert-success">
        <div class="col-md-12">
            <h1>OSSIM | HLZ</h1>
        </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-8">
            <div id="map"></div>
        </div>

        <div class="col-md-4">
            <form>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label label-primary" for="lat">Latitude:</label>
                            <input type="text" class="form-control" id="lat" placeholder="28.57">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label label-primary" for="lon">Longitude:</label>
                            <input type="text" class="form-control" id="lon" placeholder="-81.24">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <span id="helpBlock" class="help-block">Note: Radius vaules are in meters</span>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label label-primary" for="radiusROI">Radius:</label>
                            <input type="text" class="form-control" id="radiusROI" placeholder="0">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label label-primary" for="radiusLZ">Landing Zone Radius:</label>
                            <input type="text" class="form-control" id="radiusLZ" placeholder="0">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label label-primary" for="roughness">Roughness:</label>
                            <input type="text" class="form-control" id="roughness" placeholder="0">
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="label label-primary" for="slope">Slope:</label>
                            <input type="text" class="form-control" id="slope" placeholder="0">
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <button type="button" class="btn btn-success" id="updateHLZ">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<asset:javascript src="ossimHLZ.js"/>
<asset:script>
    $(document).ready(function() {
        var initParmas = ${raw( initParams.encodeAsJSON() as String )};
        ossimHLZ.initialize(initParmas);
    });
</asset:script>
<asset:deferredScripts/>
</body>
</html>