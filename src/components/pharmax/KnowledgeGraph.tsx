import { useEffect, useRef, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw,
  Hexagon,
  Circle,
  Square,
  Diamond,
  Network,
} from "lucide-react";
import type { KnowledgeGraph as KnowledgeGraphType, GraphNode, NodeType } from "@shared/schema";

interface KnowledgeGraphProps {
  graph: KnowledgeGraphType;
  onNodeClick?: (node: GraphNode) => void;
  isLoading?: boolean;
}

const nodeConfig: Record<NodeType, { color: string; bgColor: string; icon: string; size: number }> = {
  drug: { color: "#0ea5e9", bgColor: "rgba(14, 165, 233, 0.2)", icon: "hexagon", size: 24 },
  protein: { color: "#a855f7", bgColor: "rgba(168, 85, 247, 0.2)", icon: "circle", size: 18 },
  pathway: { color: "#22c55e", bgColor: "rgba(34, 197, 94, 0.2)", icon: "rect", size: 20 },
  disease: { color: "#f97316", bgColor: "rgba(249, 115, 22, 0.2)", icon: "diamond", size: 22 },
  patent: { color: "#eab308", bgColor: "rgba(234, 179, 8, 0.2)", icon: "square", size: 16 },
};

interface NodePosition {
  x: number;
  y: number;
}

export function KnowledgeGraph({ graph, onNodeClick, isLoading }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [nodePositions, setNodePositions] = useState<Map<string, NodePosition>>(new Map());
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const initializeNodePositions = useCallback(() => {
    const positions = new Map<string, NodePosition>();
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const nodesByType = new Map<NodeType, GraphNode[]>();
    graph.nodes.forEach(node => {
      const existing = nodesByType.get(node.type) || [];
      existing.push(node);
      nodesByType.set(node.type, existing);
    });

    const typeOrder: NodeType[] = ["drug", "protein", "pathway", "disease", "patent"];
    const ringRadii = [0, 120, 200, 280, 350];

    typeOrder.forEach((type, ringIndex) => {
      const nodes = nodesByType.get(type) || [];
      const radius = ringRadii[ringIndex];
      
      nodes.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / Math.max(nodes.length, 1);
        const jitter = (Math.random() - 0.5) * 30;
        positions.set(node.id, {
          x: centerX + radius * Math.cos(angle) + jitter,
          y: centerY + radius * Math.sin(angle) + jitter,
        });
      });
    });

    setNodePositions(positions);
  }, [graph.nodes]);

  useEffect(() => {
    if (graph.nodes.length > 0) {
      initializeNodePositions();
    }
  }, [graph.nodes, initializeNodePositions]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    graph.edges.forEach(edge => {
      const sourcePos = nodePositions.get(edge.source);
      const targetPos = nodePositions.get(edge.target);
      if (!sourcePos || !targetPos) return;

      ctx.beginPath();
      ctx.moveTo(sourcePos.x, sourcePos.y);
      ctx.lineTo(targetPos.x, targetPos.y);
      ctx.strokeStyle = `rgba(100, 116, 139, ${0.2 + edge.weight * 0.3})`;
      ctx.lineWidth = 1 + edge.weight;
      ctx.stroke();
    });

    graph.nodes.forEach(node => {
      const pos = nodePositions.get(node.id);
      if (!pos) return;

      const config = nodeConfig[node.type];
      const isHovered = hoveredNode?.id === node.id;
      const isSelected = selectedNode?.id === node.id;
      const size = config.size * (isHovered || isSelected ? 1.2 : 1);

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
      ctx.fillStyle = config.bgColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
      ctx.strokeStyle = isSelected ? "#fff" : config.color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size * 0.5, 0, 2 * Math.PI);
      ctx.fillStyle = config.color;
      ctx.fill();

      if (isHovered || isSelected || scale > 0.8) {
        ctx.font = "11px Inter";
        ctx.fillStyle = "#e2e8f0";
        ctx.textAlign = "center";
        ctx.fillText(node.label, pos.x, pos.y + size + 14);
      }
    });

    ctx.restore();
  }, [graph, nodePositions, offset, scale, hoveredNode, selectedNode]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (canvas && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        draw();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    if (isDragging) {
      setOffset({
        x: e.clientX - rect.left - dragStart.x,
        y: e.clientY - rect.top - dragStart.y,
      });
      return;
    }

    let found: GraphNode | null = null;
    for (const node of graph.nodes) {
      const pos = nodePositions.get(node.id);
      if (!pos) continue;
      
      const config = nodeConfig[node.type];
      const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
      if (dist < config.size) {
        found = node;
        break;
      }
    }
    
    setHoveredNode(found);
    canvas.style.cursor = found ? "pointer" : isDragging ? "grabbing" : "grab";
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    
    if (hoveredNode) {
      setSelectedNode(hoveredNode);
      onNodeClick?.(hoveredNode);
    } else {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - rect.left - offset.x,
        y: e.clientY - rect.top - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale(s => Math.min(s * 1.2, 3));
  const handleZoomOut = () => setScale(s => Math.max(s / 1.2, 0.3));
  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
    initializeNodePositions();
  };

  if (isLoading) {
    return (
      <Card className="border-card-border">
        <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle className="text-lg">Knowledge Graph</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="h-[400px] bg-muted/50 rounded-md flex items-center justify-center">
            <div className="text-center">
              <Network className="w-12 h-12 text-muted-foreground mx-auto mb-2 animate-pulse" />
              <p className="text-sm text-muted-foreground">Loading graph...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-card-border">
      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between gap-4 space-y-0 flex-wrap">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg">Knowledge Graph</CardTitle>
          <Badge variant="secondary" className="text-xs">
            {graph.nodes.length} nodes
          </Badge>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleZoomIn} data-testid="button-zoom-in">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomOut} data-testid="button-zoom-out">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleReset} data-testid="button-reset-graph">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3">
        <div className="flex items-center gap-4 flex-wrap">
          {Object.entries(nodeConfig).map(([type, config]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: config.color }}
              />
              <span className="text-xs text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>

        <div 
          ref={containerRef}
          className="relative h-[400px] bg-background/50 rounded-md overflow-hidden border border-border"
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="w-full h-full"
            data-testid="canvas-knowledge-graph"
          />
          
          {selectedNode && (
            <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-md p-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: nodeConfig[selectedNode.type].color }}
                  />
                  <span className="font-medium text-sm">{selectedNode.label}</span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {selectedNode.type}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedNode(null)}
                  data-testid="button-close-node-details"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
