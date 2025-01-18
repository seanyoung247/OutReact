
import { ContainerRegistry } from "./components/objects3d/containers";
import { RoadObjectDesc } from "./components/objects3d/templates/registry";
import { formatRoad } from "./components/road3d";
import { TargetRegistry } from "./utilities/registry";

const roadSegments = [
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },

    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },

    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },

    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },

    { curve: 0.5 }, { curve: 1.0 }, { curve: 1.5 }, { curve: 2.5 }, { curve: 4.0 },
    { curve: 4.5 }, { curve: 5 }, { curve: 5 }, { curve: 5 }, { curve: 5 },

    { curve: 5 }, { curve: 5 }, { curve: 5 }, { curve: 5 }, { curve: 5 },
    { curve: 5 }, { curve: 5 }, { curve: 5 }, { curve: 5 }, { curve: 5 },
    
    { curve: 5 }, { curve: 5 }, { curve: 4.5 }, { curve: 4.0 }, { curve: 3.0 },
    { curve: 2.0 }, { curve: 1.0 }, { curve: 0 }, { curve: -0.5 }, { curve: -1.5 },

    { curve: -2 }, { curve: -2 }, { curve: -2 }, { curve: -2 }, { curve: -2 },
    { curve: -2 }, { curve: -2 }, { curve: -2 }, { curve: -2 }, { curve: -2 },

    { curve: -2 }, { curve: -2 }, { curve: -2 }, { curve: -2 }, { curve: 0 },
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
    
    { curve: 0 }, { curve: -1 }, { curve: -1 }, { curve: -1 }, { curve: -1 },
    { curve: -1 }, { curve: -1 }, { curve: -1 }, { curve: -1 }, { curve: -1 },

    { curve: -1 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 },
    { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 },

    { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 },
    { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: -1.5 }, { curve: 0 },

    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
    { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 }, { curve: 0 },
]

const roadObjects:RoadObjectDesc[] = [
    { type: "road-sign", props: {z:5, header: "Languages"}, 
        content: [
            {type: "skill-badges", props: { badges: [
                {title: "JavaScript", name: "Expert", value: "100"},
                {title: "HTML/CSS", name: "Expert", value: "100"},
                {title: "TypeScript", name: "Advanced", value: "80"},
                {title: "Python", name: "Proficient", value: "65"},
            ]}},
            {type: "trigger-button", props: {
                trigger: "show-skills1",
                context: "road-sign",
                text: "Read More >",
            }}
        ]
    },
    { type: "road-sign", props: {z:7, header: "Frameworks"}, 
        content: [
            {type: "skill-list", props: {items: [
                {skill: "React", value: 90, grade:"(Advanced)", display: "90m"},
                {skill: "Vue", value: 50, grade:"(Proficient)", display: "50m"},
                {skill: "Django", value: 65, grade:"(Proficient)", display: "65m"},
                {skill: "Flask", value: 70, grade:"(Proficient)", display: "70m"},
            ]}}
        ]
    },
    { type: "road-sign", props: {z:22, header: "Far away!"},
        content: [
            "This sign is far away!", 
            "More lines...",
            "And some more",
            "This is a line of text",
        ]
    },
    { type: "road-sign", props: {z:25, header: "Very Far away!"},
        content: [
            "This sign is even further away!"
        ]
    },
    { type: "road-sign", props: {z:60, header: "Curvy!"},
        content: [
            "This sign is on a curve!"
        ]
    }
]

const contentObjects: ContainerRegistry = {
    "skills1-modal": { type: "modal", props: {header: "Language Skills"},
        content: [
            "Test Content"
        ]
    }
}

const triggers: TargetRegistry = {
    'show-skills1': { type: 'container-toggle', target: "skills1-modal" },
}

const animations: TargetRegistry<AnimationKeyFrame> = {
    'start-anim': { type: 'settings', target: "view", data: {
        perspective: [50, 4],
        horizon: [500, 35]
    }}, 
}

export const testRoad = formatRoad(120, 
    roadSegments, 
    roadObjects, 
    contentObjects,
    triggers,
    animations,
)
