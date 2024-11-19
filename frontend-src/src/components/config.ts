
export const config = {
    scrollHeight: '20000px',// Scroll distance
    view: {
        width: '100%',      // CSS 3D view width
        height: '100lvh',   // CSS 3D view height
        perspective: 4,     // Perspective distance in lvh
        horizon: 35,        // Horizon position (percent from bottom)
    },
    road: {
        scale: 4,           // Road Scaling factor
        distance: 100,      // Visible distance in lvh units
        width: 150,         // road width in lvh
        // Segment values
        count: 20,          // Number of onscreen visible segments
        lip: 2,             // Length of overlap between segments in lvh
        get length() {      // Length of individual segments excluding lip
            return this.distance / this.count
        },
        get height() {      // Total length of segments including lip
            return this.length + this.lip
        },
    },
}
