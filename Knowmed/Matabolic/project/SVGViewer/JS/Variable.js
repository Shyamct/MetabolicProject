var searchedText = '';
var pathwayId = 113; // For Live Server replace it to 113
var relation;
var markerGroupList;
var harmfulColor = '#C20000;#FFFFFF;#C20000;#C20000';
var beneficialColor = '#008829;#FFFFFF;#008829;#008829';
var defaultColor = '#0072B1;#FFFFFF;#0072B1;#0072B1';
var previousColor = '';
var currentColor = '';
var currentHarmfulColor = '#FF4500;#FFFFFF;#FF4500;#FF4500';
var currentBeneficialColor = '#6B8E23;#FFFFFF;#6B8E23;#6B8E23';
var currentDefaultColor = '#87CEFA;#FFFFFF;#87CEFA;#87CEFA';
var firstLayer = 'Layer_x0020_1';
var groupPrefix = 'Grp_';
var startPrefix = 'Str_';
var endPrefix = 'End_';
var beneficialPrefix = 'Bft_';
var harmfulPrefix = 'Hrm_';
var sectionPrefix = 'Sec_';
var subSectionPrefix = 'Subsec_';
var commonMarkerPrefix = 'Hrm_Bft_';
var commonStartPrefix = 'Str_Hrm_Bft_';
var commonEndPrefix = 'End_Hrm_Bft_';
var startFlag = 'Str';
var endFlag = 'End';
//var searchTextboxId = '#txtSearch';
//var colorPickerId = '#colorPicker';
//var ddlSectionId = '#ddlSection';
//var ddlSubSectionId = '#ddlSubSection';
var svgGroupTag = 'g';
var svgTextTag = 'text';
var svgPathTag = 'path';
var svgRectTag = 'rect';
var svgPolygonTag = 'polygon';
var svgDocument = 'document';
var mainSVGObject = 'svgObject';
var _svgObject; // To store svg document.
var _svgGroup; // To store all group tags inside svg document.
var _svgText; // To store all text tags inside svg document.
var _svgPath; // To store all path tags inside svg document.
var _svgRect; // To store all rect tags inside svg document.
var _svgPolygon; // To store all polygon tags inside svg document.
var gTagArray = [];
var textCount = 0;
var currentIndex = -1;
var sectionId = 0;
var subSectionId = 0;