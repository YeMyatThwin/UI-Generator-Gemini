/**
 * Figma API Service
 * Handles copying generated designs to Figma frames
 */

export interface FigmaConfig {
  accessToken: string;
  fileKey: string;
}

/**
 * Copy the current design to a Figma frame
 * This creates a new frame in the specified Figma file with the HTML content
 */
export async function copyToFigma(
  code: string,
  config: FigmaConfig
): Promise<{ success: boolean; message: string; url?: string }> {
  
  if (!config.accessToken || !config.fileKey) {
    return {
      success: false,
      message: 'Figma access token and file key are required. Please configure them first.'
    };
  }

  try {
    // Extract the component name from the code if possible
    const componentNameMatch = code.match(/const\s+(\w+)\s*[:=]/);
    const componentName = componentNameMatch ? componentNameMatch[1] : 'Generated Component';
    
    // Create a frame in Figma with a text node containing the code
    // Note: Figma doesn't directly support HTML rendering, so we'll create a frame
    // with metadata that can be used with Figma plugins or HTML embed
    
    const frameData = {
      name: `${componentName} - ${new Date().toLocaleString()}`,
      // Create a frame with the code as description
      // This will need to be rendered by a Figma plugin or manually
      pluginData: {
        html: code,
        generatedAt: new Date().toISOString()
      }
    };

    const response = await fetch(
      `https://api.figma.com/v1/files/${config.fileKey}/nodes`,
      {
        method: 'POST',
        headers: {
          'X-Figma-Token': config.accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Create a frame node
          node: {
            type: 'FRAME',
            name: frameData.name,
            width: 1200,
            height: 800,
            backgroundColor: { r: 1, g: 1, b: 1, a: 1 },
            children: [
              {
                type: 'TEXT',
                name: 'Component Code',
                characters: `Generated React Component\n\nTo render this:\n1. Copy the code below\n2. Use a Figma-to-React plugin\n3. Or implement in your codebase\n\n${code.substring(0, 500)}...`,
                fontSize: 12,
                fontName: { family: 'Inter', style: 'Regular' },
              }
            ]
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create frame in Figma');
    }

    const result = await response.json();
    
    return {
      success: true,
      message: 'Design copied to Figma successfully!',
      url: `https://www.figma.com/file/${config.fileKey}`
    };
    
  } catch (error: any) {
    console.error('Figma API Error:', error);
    return {
      success: false,
      message: error.message || 'Failed to copy to Figma. Please check your configuration.'
    };
  }
}

/**
 * Capture the design as an image and copy to clipboard
 * This allows users to paste directly into Figma frames
 */
export async function copyDesignAsImage(previewElement: HTMLElement): Promise<boolean> {
  try {
    // Dynamically import html2canvas
    const html2canvas = (await import('html2canvas')).default;
    
    // Capture the preview element as a canvas
    const canvas = await html2canvas(previewElement, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher quality (2x resolution)
      logging: false,
      useCORS: true,
      allowTaint: true,
    });
    
    // Convert canvas to blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      }, 'image/png');
    });
    
    // Copy to clipboard using the Clipboard API
    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob
      })
    ]);
    
    return true;
  } catch (error) {
    console.error('Failed to copy design as image:', error);
    return false;
  }
}
