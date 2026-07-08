"use client";

import { useEffect, useRef, useCallback } from "react";
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { initializeBlockly, codecrittersTheme } from "@/lib/blockly";
import { fullToolbox, buildToolboxForBlocks } from "@/lib/blockly/toolbox";
import { useEditorStore } from "@/stores/editorStore";

interface BlocklyWorkspaceProps {
  availableBlocks?: string[];
  initialXml?: string;
  readOnly?: boolean;
}

export default function BlocklyWorkspace({
  availableBlocks,
  initialXml,
  readOnly = false,
}: BlocklyWorkspaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const setWorkspaceXml = useEditorStore((s) => s.setWorkspaceXml);
  const setGeneratedCode = useEditorStore((s) => s.setGeneratedCode);

  const handleWorkspaceChange = useCallback(() => {
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const xml = Blockly.serialization.workspaces.save(workspace);
    setWorkspaceXml(JSON.stringify(xml));

    const code = javascriptGenerator.workspaceToCode(workspace);
    setGeneratedCode(code);
  }, [setWorkspaceXml, setGeneratedCode]);

  useEffect(() => {
    if (!containerRef.current) return;

    initializeBlockly();

    const toolbox = availableBlocks
      ? buildToolboxForBlocks(availableBlocks)
      : fullToolbox;

    const workspace = Blockly.inject(containerRef.current, {
      toolbox,
      theme: codecrittersTheme,
      grid: {
        spacing: 20,
        length: 3,
        colour: "#E8E8F0",
        snap: true,
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 2,
        minScale: 0.5,
        scaleSpeed: 1.1,
      },
      trashcan: true,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true,
      },
      readOnly,
      sounds: true,
      renderer: "zelos",
    });

    workspaceRef.current = workspace;

    if (initialXml) {
      try {
        const state = JSON.parse(initialXml);
        Blockly.serialization.workspaces.load(state, workspace);
      } catch {
        // ignore invalid XML
      }
    }

    workspace.addChangeListener(handleWorkspaceChange);

    const resizeObserver = new ResizeObserver(() => {
      Blockly.svgResize(workspace);
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      workspace.removeChangeListener(handleWorkspaceChange);
      workspace.dispose();
      workspaceRef.current = null;
    };
  }, [availableBlocks, initialXml, readOnly, handleWorkspaceChange]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden border-2 border-indigo-100"
    />
  );
}
