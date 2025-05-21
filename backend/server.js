require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Client } = require('@notionhq/client');

const app = express();
app.use(cors());
app.use(express.json());

// Log environment variables on startup
console.log('[ENV CHECK] NOTION_API_KEY:', process.env.NOTION_API_KEY ? '***' : 'MISSING');
console.log('[ENV CHECK] NOTION_DATABASE_ID:', process.env.NOTION_DATABASE_ID || 'MISSING');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// Validate Notion client connection
(async () => {
  try {
    await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID });
    console.log('[NOTION] Successfully connected to database');
  } catch (error) {
    console.error('[NOTION] Connection error:', error.message);
  }
})();

const walletToPage = {};

app.post('/api/create-notion-page', async (req, res) => {
  console.log('[API] POST /api/create-notion-page', req.body);
  
  const { walletAddress } = req.body;
  if (!walletAddress) {
    console.log('[ERROR] Missing walletAddress');
    return res.status(400).json({ error: 'Missing walletAddress' });
  }

  if (walletToPage[walletAddress]) {
    console.log(`[CACHE] Existing page for ${walletAddress.slice(0, 8)}...`);
    return res.json({ pageId: walletToPage[walletAddress] });
  }

  try {
    console.log(`[NOTION] Creating page for ${walletAddress.slice(0, 8)}...`);
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: `Physics Notes - ${walletAddress.slice(0, 8)}`
              }
            }
          ]
        },
        "Wallet Address": {
          rich_text: [
            {
              text: { content: walletAddress }
            }
          ]
        }
      }
    });

    console.log(`[NOTION] Created page: ${response.id}`);
    walletToPage[walletAddress] = response.id;
    res.json({ pageId: response.id });

  } catch (error) {
    console.error('[NOTION] Creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create Notion page',
      details: error.message 
    });
  }
});

app.post('/api/append-note', async (req, res) => {
  console.log('[API] POST /api/append-note', req.body);
  
  const { walletAddress, content } = req.body;
  const pageId = walletToPage[walletAddress];
  
  if (!pageId) {
    console.log(`[ERROR] No page mapped for ${walletAddress.slice(0, 8)}...`);
    return res.status(400).json({ error: 'No Notion page for this wallet' });
  }

  try {
    console.log(`[NOTION] Appending to ${pageId}`);
    await notion.blocks.children.append({
      block_id: pageId,
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: { content }
              }
            ]
          }
        }
      ]
    });
    
    console.log('[NOTION] Append successful');
    res.json({ success: true });

  } catch (error) {
    console.error('[NOTION] Append error:', error);
    res.status(500).json({ 
      error: 'Failed to append note',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`[SERVER] Running on port ${PORT}`));
